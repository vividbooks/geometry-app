// Performance utility funkce pro starší zařízení a tablety

/**
 * Throttle - omezí volání funkce na maximálně jednou za daný čas
 * Ideální pro scroll, resize, mousemove events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce - odloží volání funkce až po daném čase bez dalších volání
 * Ideální pro search inputs, window resize completion
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * RequestAnimationFrame throttle - pro smooth animations
 * Omezí volání na jeden frame
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
}

/**
 * Detekce výkonu zařízení na základě různých faktorů
 */
export function detectDevicePerformance(): 'low' | 'medium' | 'high' {
  // Počet CPU cores
  const cores = navigator.hardwareConcurrency || 2;
  
  // Device memory (pokud je dostupné)
  const memory = (navigator as any).deviceMemory;
  
  // Connection type (pokud je dostupné)
  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;
  
  let score = 0;
  
  // CPU score
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;
  
  // Memory score
  if (memory) {
    if (memory >= 8) score += 3;
    else if (memory >= 4) score += 2;
    else score += 1;
  } else {
    score += 2; // Default medium pokud není dostupné
  }
  
  // Connection score
  if (effectiveType) {
    if (effectiveType === '4g' || effectiveType === '5g') score += 2;
    else if (effectiveType === '3g') score += 1;
  }
  
  // Vyhodnocení
  if (score >= 7) return 'high';
  if (score >= 4) return 'medium';
  return 'low';
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}
