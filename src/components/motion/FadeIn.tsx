"use client";

import { m } from "framer-motion";

const ease = [0.2, 0.7, 0.2, 1] as const;
type Dir = "up" | "left" | "right" | "none";

const offset = (d: Dir) =>
  d === "up" ? { y: 32 } : d === "left" ? { x: -48 } : d === "right" ? { x: 48 } : {};

/**
 * Scroll-triggered entrance (fade-in-up / slide-in-left/right / fade). Fires once.
 * Content is server-rendered; only the entrance is animated.
 */
export function FadeIn({
  children,
  className,
  dir = "up",
  delay = 0,
  duration = 0.7,
  as = "div",
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  dir?: Dir;
  delay?: number;
  duration?: number;
  as?: "div" | "li" | "article";
  amount?: number;
}) {
  const Comp = as === "li" ? m.li : as === "article" ? m.article : m.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, ...offset(dir) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease, delay }}
    >
      {children}
    </Comp>
  );
}
