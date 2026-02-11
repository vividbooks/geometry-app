import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-b149bbbb/health", (c) => {
  return c.json({ status: "ok" });
});

// --- RECORDING ROUTES ---

// Generate short random ID
function generateId(length = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    result += chars[arr[i] % chars.length];
  }
  return result;
}

// Initialize storage bucket
const BUCKET_NAME = 'make-b149bbbb-recordings';
let bucketInitialized = false;

async function ensureBucket() {
  if (bucketInitialized) return;
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((bucket: any) => bucket.name === BUCKET_NAME);
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, { public: false });
    }
    bucketInitialized = true;
  } catch (e) {
    console.log('Error ensuring bucket:', e);
  }
}

// Save a recording
app.post("/make-server-b149bbbb/recordings", async (c) => {
  try {
    const body = await c.req.json();
    const { name, steps, deviceType } = body;

    if (!name || !steps || !Array.isArray(steps) || steps.length === 0) {
      return c.json({ error: 'Missing required fields: name, steps (non-empty array)' }, 400);
    }

    const id = generateId();
    
    // Store recording data in Supabase Storage (can be large)
    await ensureBucket();
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    const recordingData = JSON.stringify({ steps });
    const filePath = `${id}.json`;
    
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, recordingData, {
        contentType: 'application/json',
        upsert: false
      });
    
    if (uploadError) {
      console.log('Storage upload error:', uploadError);
      return c.json({ error: `Failed to upload recording data: ${uploadError.message}` }, 500);
    }

    // Store metadata in KV
    await kv.set(`recording:${id}`, {
      id,
      name,
      deviceType: deviceType || 'computer',
      stepCount: steps.length,
      createdAt: new Date().toISOString()
    });

    console.log(`Recording saved: id=${id}, name="${name}", steps=${steps.length}`);
    return c.json({ id, name });
  } catch (e) {
    console.log('Error saving recording:', e);
    return c.json({ error: `Failed to save recording: ${e}` }, 500);
  }
});

// Get a recording by ID
app.get("/make-server-b149bbbb/recordings/:id", async (c) => {
  try {
    const id = c.req.param('id');

    // Get metadata from KV
    const metadata = await kv.get(`recording:${id}`);
    if (!metadata) {
      return c.json({ error: 'Recording not found' }, 404);
    }

    // Get recording data from Storage
    await ensureBucket();
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: fileData, error: downloadError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(`${id}.json`);

    if (downloadError || !fileData) {
      console.log('Storage download error:', downloadError);
      return c.json({ error: `Failed to download recording data: ${downloadError?.message}` }, 500);
    }

    const text = await fileData.text();
    const recordingData = JSON.parse(text);

    return c.json({
      id: metadata.id,
      name: metadata.name,
      deviceType: metadata.deviceType,
      stepCount: metadata.stepCount,
      createdAt: metadata.createdAt,
      steps: recordingData.steps
    });
  } catch (e) {
    console.log('Error getting recording:', e);
    return c.json({ error: `Failed to get recording: ${e}` }, 500);
  }
});

Deno.serve(app.fetch);