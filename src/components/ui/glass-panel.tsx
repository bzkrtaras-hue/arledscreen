import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassPanel({
  className,
  glow = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl",
        glow && "shadow-glow",
        className,
      )}
      {...props}
    />
  );
}
