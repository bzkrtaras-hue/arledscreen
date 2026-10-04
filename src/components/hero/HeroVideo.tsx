"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Calculator, Pause, Play } from "lucide-react";

interface HeroVideoProps {
  src: string;
  poster: string;
  width: number;
  height: number;
  videoLabel: string;
  lockupPrimary: string;
  lockupSecondary: string;
  headline: string;
  subcopy: string;
  quoteHref: string;
  quoteLabel: string;
  calcHref: string;
  calcLabel: string;
  labels: { region: string; pause: string; play: string };
}

const ease = [0.2, 0.7, 0.2, 1] as const;

/**
 * Full-bleed product-video hero. Copy sits in a bottom-left navy safe zone
 * and paints at full opacity on first frame (H1 is LCP). Three motions:
 * video fade onto poster, accent rule, pause control fade-in.
 * No glass pills, no carousel, no rounded-full CTAs.
 */
export function HeroVideo({
  src,
  poster,
  width,
  height,
  videoLabel,
  lockupPrimary,
  lockupSecondary,
  headline,
  subcopy,
  quoteHref,
  quoteLabel,
  calcHref,
  calcLabel,
  labels,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.play().catch(() => {});
  }, [reduce]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onVis = () => {
      if (document.hidden) v.pause();
      else tryPlay();
    };

    if (reduce) {
      v.pause();
      return;
    }

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) tryPlay();
          else v.pause();
        },
        { threshold: 0.25 },
      );
      io.observe(v);
    } else {
      tryPlay();
    }

    document.addEventListener("visibilitychange", onVis);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce, tryPlay]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  return (
    <section aria-label={labels.region} className="relative isolate w-full overflow-hidden bg-navy">
      <div className="relative h-[calc(100dvh-108px)] min-h-[560px] md:h-[clamp(640px,calc(100dvh-116px),860px)] md:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          width={width}
          height={height}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%] md:object-[68%_42%]"
        />
        <m.video
          ref={videoRef}
          src={src}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden={true}
          initial={false}
          animate={{ opacity: ready && !reduce ? 1 : 0 }}
          transition={{ duration: 0.6, ease }}
          onCanPlay={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%] md:object-[68%_42%]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,79,0.28)_0%,rgba(15,42,79,0.40)_38%,rgba(11,27,51,0.84)_70%,rgba(11,27,51,0.96)_100%)] md:bg-[linear-gradient(105deg,rgba(15,42,79,0.94)_0%,rgba(15,42,79,0.78)_34%,rgba(11,27,51,0.42)_58%,rgba(11,27,51,0.16)_100%),linear-gradient(180deg,rgba(15,42,79,0.22)_0%,transparent_30%,rgba(11,27,51,0.50)_70%,rgba(11,27,51,0.88)_100%)]"
          aria-hidden
        />

        <m.button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          aria-pressed={playing}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease, delay: 0.4 }}
          className="absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-navy/80 text-white transition hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:end-8 md:top-8"
        >
          {playing ? (
            <Pause className="h-[18px] w-[18px]" aria-hidden />
          ) : (
            <Play className="ml-0.5 h-[18px] w-[18px]" aria-hidden />
          )}
        </m.button>

        <div className="relative z-[1] mx-auto flex h-full max-w-7xl items-end px-5 pb-[calc(4.5rem+1.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:px-8 md:pb-[72px] lg:px-8">
          <div className="w-full max-w-[560px]">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">
              {lockupPrimary}
              <span className="mx-2.5 inline-block h-3 w-px bg-[#1E5BB8] align-middle" aria-hidden />
              {lockupSecondary}
            </p>
            <m.span
              aria-hidden
              className="mt-3 block h-0.5 w-10 origin-left bg-[#1E5BB8] rtl:origin-right"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.15 }}
            />
            <h1 className="mt-5 text-balance font-display text-[clamp(2rem,1.35rem+3vw,4rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-white">
              {headline}
            </h1>
            <p className="mt-4 max-w-[36ch] text-pretty text-[15px] leading-[1.6] text-white/90 sm:text-base sm:leading-[1.65] md:text-lg">
              {subcopy}
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                href={quoteHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1E5BB8] px-7 text-[15px] font-semibold text-white shadow-glow hover:bg-cyan-600 md:min-h-[52px] md:text-base"
              >
                {quoteLabel}
              </Link>
              <Link
                href={calcHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-[1.5px] border-white/70 bg-transparent px-7 text-[15px] font-semibold text-white hover:bg-white/10 md:min-h-[52px] md:text-base"
              >
                <Calculator className="h-4 w-4" aria-hidden />
                {calcLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">{videoLabel}</span>
    </section>
  );
}
