"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowRight, Calculator, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export interface HeroSlide {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  href: string;
  linkLabel: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  slogan: string;
  headline: string;
  subcopy: string;
  quoteHref: string;
  quoteLabel: string;
  calcHref: string;
  calcLabel: string;
  labels: { region: string; prev: string; next: string; goTo: string; pause: string };
}

const INTERVAL = 6500;
const ease = [0.2, 0.7, 0.2, 1] as const;

/**
 * Inset, rounded hero card with cross-fading slides. The H1, slogan and CTAs
 * are static (SEO / accessibility); only the background photo and the small
 * caption link change. Autoplay pauses on hover, focus, hidden tab and for
 * prefers-reduced-motion.
 */
export function HeroSlider({
  slides,
  slogan,
  headline,
  subcopy,
  quoteHref,
  quoteLabel,
  calcHref,
  calcLabel,
  labels,
}: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const startX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback(
    (i: number) => {
      const next = (i + n) % n;
      setMounted((prev) => new Set(prev).add(next).add((next + 1) % n));
      setIndex(next);
    },
    [n],
  );

  // Only the first photo loads with the page; the next one after first paint.
  useEffect(() => {
    const t = setTimeout(() => setMounted((p) => new Set(p).add(1 % n)), 2500);
    return () => clearTimeout(t);
  }, [n]);

  useEffect(() => {
    if (reduce || paused || n < 2) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, reduce, go, n]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const slide = slides[index];

  return (
    <section aria-label={labels.region} className="bg-white pb-4 md:px-6 md:pb-6 md:pt-6 lg:px-8">
      <div
        aria-roledescription="carousel"
        className="relative isolate mx-auto flex min-h-[560px] max-w-7xl flex-col overflow-hidden bg-navy shadow-hero sm:min-h-[540px] md:min-h-[560px] md:rounded-hero lg:min-h-[600px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        {slides.map((s, i) =>
          mounted.has(i) ? (
            <m.div
              key={s.src}
              aria-hidden={i !== index}
              className="absolute inset-0 -z-10"
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            >
              <m.div
                className="h-full w-full"
                initial={false}
                animate={i === index && !reduce ? { scale: [1.06, 1] } : { scale: 1 }}
                transition={{ duration: INTERVAL / 1000 + 1, ease: "linear" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  srcSet={s.srcSet}
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  width={s.width}
                  height={s.height}
                  alt={s.alt}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding={i === 0 ? "sync" : "async"}
                  {...(i === 0 ? { fetchPriority: "high" as const } : {})}
                  className="h-full w-full object-cover"
                />
              </m.div>
            </m.div>
          ) : null,
        )}

        <div
          className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-t from-[#0B1B33]/95 via-[#0B1B33]/70 to-[#0B1B33]/35 md:bg-gradient-to-r md:from-[#0B1B33]/92 md:via-[#0B1B33]/60 md:to-[#0B1B33]/10"
          aria-hidden
        />

        <div className="flex flex-1 flex-col justify-end px-5 pb-16 pt-10 sm:px-10 md:justify-center md:px-14 md:pb-20 lg:px-16">
          <div className="max-w-2xl">
            <p className="glass-dark inline-flex rounded-full px-3 py-1.5 text-xs font-semibold text-white sm:text-[13px]">
              {slogan}
            </p>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.15rem,1.5rem+3vw,3.75rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
              {headline}
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-[15px] leading-[1.7] text-white/90 sm:text-lg">{subcopy}</p>

            <div className="mt-5 min-h-[28px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <m.p
                  key={index}
                  initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/85"
                >
                  <span className="h-px w-8 bg-[#9CC0F5]" aria-hidden />
                  <span className="font-semibold text-white">{slide.caption}</span>
                  <Link
                    href={slide.href}
                    className="inline-flex items-center gap-1 font-semibold text-[#9CC0F5] underline-offset-4 hover:underline"
                  >
                    {slide.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </m.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={quoteHref}
                className="btn-soft inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-base text-cyan-700 shadow-pill hover:bg-cyan-50"
              >
                {quoteLabel}
                <Plus className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={calcHref}
                className="btn-soft glass-dark inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base text-white hover:bg-[rgba(15,35,70,0.86)]"
              >
                <Calculator className="h-4 w-4" aria-hidden />
                {calcLabel}
              </Link>
            </div>
          </div>
        </div>

        {n > 1
          ? [-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(index + d)}
                aria-label={d < 0 ? labels.prev : labels.next}
                className={`absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/50 lg:flex ${
                  d < 0 ? "left-4" : "right-4"
                }`}
              >
                {d < 0 ? <ChevronLeft className="h-6 w-6" aria-hidden /> : <ChevronRight className="h-6 w-6" aria-hidden />}
              </button>
            ))
          : null}

        {n > 1 ? (
          <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-1">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`${labels.goTo} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="group flex h-8 w-8 items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-7 bg-white" : "w-2.5 bg-white/55 group-hover:bg-white/80"
                  }`}
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
