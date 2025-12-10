"use client";

import { cn } from "@/lib/utils";

interface BackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function DotPatternBackground({ className, children }: BackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-0 opacity-[0.4]">
        <div className="absolute inset-0 bg-[radial-gradient(#808080_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function GridPatternBackground({
  className,
  children,
}: BackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-0 opacity-[0.4]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[45px_45px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function GlowingOrbsBackground({
  className,
  children,
}: BackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function CircuitBoardBackground({
  className,
  children,
}: BackgroundProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circuit-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 10h80v80h-80z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
              <circle cx="90" cy="90" r="1.5" fill="currentColor" />
              <path
                d="M10 10l20 20h40l20-20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
