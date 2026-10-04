"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/** Loads only the DOM animation feature set and honours prefers-reduced-motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
