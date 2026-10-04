"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

export type HeroClip = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Short scene label for a11y / dots */
  label: string;
};

interface HeroVideoProps {
  clips: HeroClip[];
  /** Large brand wordmark (pack B) */
  brand: string;
  eyebrow: string;
  headline: string;
  subcopy: string;
  quoteHref: string;
  quoteLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  labels: { region: string; pause: string; play: string };
  /** Soft crossfade dwell per clip (ms) */
  dwellMs?: number;
}

const ease = [0.22, 0.65, 0.2, 1] as const;
const CROSSFADE_S = 1.15;

/**
 * Full-bleed multi-clip hero with soft crossfades.
 * Copy: bottom-left navy safe zone. Brand-first. No glass pills.
 * Canlı Destek / chat widget lives outside this component (homepage Script).
 */
export function HeroVideo({
  clips,
  brand,
  eyebrow,
  headline,
  subcopy,
  quoteHref,
  quoteLabel,
  secondaryHref,
  secondaryLabel,
  labels,
  dwellMs = 8000,
}: HeroVideoProps) {
  const reduce = useReducedMotion();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [ready, setReady] = useState<Record<number, boolean>>({});

  const playIndex = useCallback(
    (i: number, allowPlay: boolean) => {
      videoRefs.current.forEach((v, n) => {
        if (!v) return;
        if (n === i && !reduce && allowPlay) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    [reduce],
  );

  useEffect(() => {
    if (reduce || clips.length < 2 || userPaused) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % clips.length);
    }, dwellMs);
    return () => window.clearInterval(id);
  }, [clips.length, dwellMs, reduce, userPaused]);

  useEffect(() => {
    playIndex(active, !userPaused);
  }, [active, playIndex, userPaused]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        videoRefs.current.forEach((v) => v?.pause());
      } else if (!userPaused) {
        playIndex(active, true);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [active, playIndex, userPaused]);

  const toggle = () => {
    if (userPaused) {
      setUserPaused(false);
      playIndex(active, true);
      setPlaying(true);
    } else {
      setUserPaused(true);
      videoRefs.current.forEach((x) => x?.pause());
      setPlaying(false);
    }
  };

  const first = clips[0];
  if (!first) return null;

  return (
    <section aria-label={labels.region} className="relative isolate w-full overflow-hidden bg-navy">
      <div className="relative h-[calc(100dvh-108px)] min-h-[560px] md:h-[clamp(640px,calc(100dvh-116px),860px)] md:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={first.poster}
          alt=""
          width={first.width}
          height={first.height}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover object-[50%_28%] md:object-[68%_42%]"
        />

        {clips.map((clip, i) => (
          <m.video
            key={clip.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={clip.src}
            poster={clip.poster}
            width={clip.width}
            height={clip.height}
            muted
            loop
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            aria-hidden={true}
            initial={false}
            animate={{
              opacity: ready[i] && active === i && !reduce ? 1 : 0,
            }}
            transition={{ duration: CROSSFADE_S, ease }}
            onCanPlay={() => setReady((r) => ({ ...r, [i]: true }))}
            onPlay={() => {
              if (i === active) setPlaying(true);
            }}
            onPause={() => {
              if (i === active && userPaused) setPlaying(false);
            }}
            className="absolute inset-0 h-full w-full object-cover object-[50%_28%] md:object-[68%_42%]"
            style={{ zIndex: active === i ? 1 : 0 }}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(15,42,79,0.28)_0%,rgba(15,42,79,0.40)_38%,rgba(11,27,51,0.84)_70%,rgba(11,27,51,0.96)_100%)] md:bg-[linear-gradient(105deg,rgba(15,42,79,0.94)_0%,rgba(15,42,79,0.78)_34%,rgba(11,27,51,0.42)_58%,rgba(11,27,51,0.16)_100%),linear-gradient(180deg,rgba(15,42,79,0.22)_0%,transparent_30%,rgba(11,27,51,0.50)_70%,rgba(11,27,51,0.88)_100%)]"
          aria-hidden
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          aria-pressed={playing}
          className="absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-navy/80 text-white transition duration-500 ease-out hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:end-8 md:top-8"
        >
          {playing ? (
            <Pause className="h-[18px] w-[18px]" aria-hidden />
          ) : (
            <Play className="ml-0.5 h-[18px] w-[18px]" aria-hidden />
          )}
        </button>

        {/* Soft scene dots */}
        {clips.length > 1 && !reduce ? (
          <div
            className="absolute bottom-5 end-4 z-10 flex gap-2 md:bottom-8 md:end-8"
            role="tablist"
            aria-label="Sahne videoları"
          >
            {clips.map((clip, i) => (
              <button
                key={clip.src}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={clip.label}
                onClick={() => {
                  setActive(i);
                  playIndex(i, !userPaused);
                }}
                className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
                  active === i ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        ) : null}

        <div className="relative z-[3] mx-auto flex h-full max-w-7xl items-end px-5 pb-[calc(4.5rem+1.5rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:px-8 md:pb-[72px] lg:px-8">
          <div className="w-full max-w-[560px]">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-xs">
              {eyebrow}
            </p>
            <m.span
              aria-hidden
              className="mt-3 block h-0.5 w-10 origin-left bg-[#1E5BB8] rtl:origin-right"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.15 }}
            />
            <p className="mt-4 font-display text-[clamp(2.4rem,1.6rem+3.5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white">
              {brand}
            </p>
            <h1 className="mt-3 text-balance font-display text-[clamp(1.25rem,1rem+1.4vw,1.85rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
              {headline}
            </h1>
            <p className="mt-4 max-w-[36ch] text-pretty text-[15px] leading-[1.6] text-white/90 transition-opacity duration-700 sm:text-base sm:leading-[1.65]">
              {subcopy}
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                href={quoteHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1E5BB8] px-7 text-[15px] font-semibold text-white shadow-glow transition duration-500 hover:bg-cyan-600 md:min-h-[52px] md:text-base"
              >
                {quoteLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center rounded-xl border-[1.5px] border-white/70 bg-transparent px-7 text-[15px] font-semibold text-white transition duration-500 hover:bg-white/10 md:min-h-[52px] md:text-base"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">
        {clips.map((c) => c.label).join(" · ")}
      </span>
    </section>
  );
}
