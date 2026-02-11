import svgPaths from "./svg-00a5zgjbjs";

function Group() {
  return (
    <div className="h-[181.48px] relative w-[72.915px]">
      <div className="absolute inset-[-0.33%_0_-0.96%_-0.82%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73.5125 183.815">
          <g id="Group 23901">
            <rect fill="var(--fill-0, #177E5D)" height="104.947" id="Rectangle 2927" rx="5.58905" stroke="var(--stroke-0, #71C7AB)" strokeWidth="1.1959" width="11.1781" x="3.71227" y="49.2117" />
            <rect fill="var(--fill-0, #177E5D)" height="124.873" id="Rectangle 2928" rx="5.58905" stroke="var(--stroke-0, #71C7AB)" strokeWidth="1.1959" transform="rotate(-22.1247 16.1272 49.2468)" width="11.1781" x="16.1272" y="49.2468" />
            <path d="M9.16365 151.303V182.079" id="Vector 7799" stroke="var(--stroke-0, #71C7AB)" strokeLinecap="round" strokeWidth="3.47323" />
            <path d={svgPaths.p22933580} id="Vector 7800" stroke="var(--stroke-0, #177E5D)" strokeLinecap="round" strokeWidth="3.47323" />
            <path d={svgPaths.p16905940} fill="var(--fill-0, #033525)" id="Rectangle 2929" stroke="var(--stroke-0, #71C7AB)" strokeWidth="1.1959" />
            <path d={svgPaths.p34b6f500} fill="var(--fill-0, #177E5D)" id="Rectangle 2930" stroke="var(--stroke-0, #71C7AB)" strokeWidth="1.1959" />
            <circle cx="16.1301" cy="40.0951" fill="var(--fill-0, #177E5D)" id="Ellipse 4930" r="3.47458" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents h-[120.739px] left-0 top-0 w-[194.628px]">
      <div className="absolute flex h-[120.739px] items-center justify-center left-0 top-0 w-[194.628px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[73.77deg]">
          <Group />
        </div>
      </div>
    </div>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <Group1 />
    </div>
  );
}