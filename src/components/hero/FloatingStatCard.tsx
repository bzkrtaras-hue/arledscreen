"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface FloatingStatCardProps {
  label: string;
  value: string;
  delay?: number;
  offsetX?: number;
  offsetY?: number;
}

export function FloatingStatCard({
  label,
  value,
  delay = 0,
  offsetX = 0,
  offsetY = 0,
}: FloatingStatCardProps) {
  const [enableParallax, setEnableParallax] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const x = useTransform(springX, (v) =>
    enableParallax ? v * 0.02 + offsetX : 0,
  );
  const y = useTransform(springY, (v) =>
    enableParallax ? v * 0.02 + offsetY : 0,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setEnableParallax(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enableParallax) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enableParallax, mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-full shrink"
    >
      <GlassPanel className="max-w-full px-3 py-2.5 shadow-glow sm:px-4 sm:py-3" glow>
        <p className="font-display text-base font-semibold text-cyan sm:text-lg md:text-xl">
          {value}
        </p>
        <p className="mt-0.5 text-xs text-ink-muted sm:text-xs">{label}</p>
      </GlassPanel>
    </motion.div>
  );
}
