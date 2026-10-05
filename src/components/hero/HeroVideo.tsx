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

export type HeroPoint = {
  title: string;
  body: string;
};

interface HeroVideoProps {
  clips: HeroClip[];
  /** Large brand wordmark (pack B) */
  brand: string;
  headline: string;
  /** Lead sentence under the H1 */
  subcopy: string;
  /** Optional structured pillars under the lead */
  points?: HeroPoint[];
  quoteHref: string;
  quoteLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  labels: { region: string; pause: string; play: string; scenes: string };
  /** Soft crossfade dwell per clip (ms) */
  dwellMs?: number;
}

const ease = [0.22, 0.65, 0.2, 1] as const;
const CROSSFADE_S = 1.2;

function coverClass(clip: HeroClip) {
  // Portrait field clips (kafe) need a different focal point than landscape storefronts.
  return clip.height > clip.width
    ? "absolute inset-0 h-full w-full object-cover object-[50%_35%]"
    : "absolute inset-0 h-full w-full object-cover object-[50%_28%] md:object-[68%_42%]";
}

/**
 * Full-bleed multi-clip hero with soft crossfades.
 * Copy: bottom-left navy safe zone. Brand-first. No glass pills.
 * Canlı Destek / chat widget lives outside this component (homepage Script).
 */
export function HeroVideo({
  clips,
  brand,
  headline,
  subcopy,
  points,
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
  const [userPaused, setUserPaused] = useState(false);
  const [ready, setReady] = useState<Record<number, boolean>>({});
  // Affordance follows user intent, not async play() — avoids Play icon while autoplaying.
  const showPause = !reduce && !userPaused;

  const playIndex = useCallback(
    (i: number, allowPlay: boolean) => {
      videoRefs.current.forEach((v, n) => {
        if (!v) return;
        if (n === i && !reduce && allowPlay) {
          // Warm decode + soft start for the incoming clip.
          if (v.readyState < 2) v.load();
          v.play().catch(() => {});
        } else if (n !== i) {
          v.pause();
        }
      });
    },
    [reduce],
  );

  // Prefetch every clip once mounted so crossfades are soft, not black.
  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      try {
        v.preload = "auto";
        if (v.readyState < 2) v.load();
      } catch {
        /* ignore */
      }
    });
  }, [clips.length]);

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
    if (reduce) return;
    if (userPaused) {
      setUserPaused(false);
      playIndex(active, true);
    } else {
      setUserPaused(true);
      videoRefs.current.forEach((x) => x?.pause());
    }
  };

  const first = clips[0];
  if (!first) return null;

  return (
    <section aria-label={labels.region} className="relative isolate w-full overflow-hidden bg-navy">
      <div className="relative h-[100svh] min-h-[560px] max-h-[860px] md:h-[clamp(700px,100dvh,920px)] md:min-h-0 md:max-h-none">
        {/* Poster stack — soft base while each clip decodes */}
        {clips.map((clip, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`poster-${clip.src}`}
            src={clip.poster}
            alt=""
            width={clip.width}
            height={clip.height}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
            className={`${coverClass(clip)} transition-opacity duration-[1200ms] ease-out`}
            style={{
              opacity: active === i ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}

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
            preload="auto"
            aria-hidden={true}
            initial={false}
            animate={{
              opacity: !reduce && ready[i] && active === i ? 1 : 0,
            }}
            transition={{ duration: CROSSFADE_S, ease }}
            onLoadedData={() => setReady((r) => ({ ...r, [i]: true }))}
            onCanPlay={() => setReady((r) => ({ ...r, [i]: true }))}
            className={coverClass(clip)}
            style={{ zIndex: active === i ? 1 : 0 }}
          />
        ))}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(15,42,79,0.28)_0%,rgba(15,42,79,0.40)_38%,rgba(11,27,51,0.84)_70%,rgba(11,27,51,0.96)_100%)] md:bg-[linear-gradient(105deg,rgba(15,42,79,0.94)_0%,rgba(15,42,79,0.78)_34%,rgba(11,27,51,0.42)_58%,rgba(11,27,51,0.16)_100%),linear-gradient(180deg,rgba(15,42,79,0.22)_0%,transparent_30%,rgba(11,27,51,0.50)_70%,rgba(11,27,51,0.88)_100%)]"
          aria-hidden
        />

        {!reduce ? (
          <button
            type="button"
            onClick={toggle}
            aria-label={showPause ? labels.pause : labels.play}
            aria-pressed={showPause}
            className="absolute end-4 top-[calc(7.25rem+0.5rem)] z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-navy/80 text-white transition duration-500 ease-out hover:bg-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:end-8 md:top-[calc(8rem+0.75rem)]"
          >
            {showPause ? (
              <Pause className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Play className="ml-0.5 h-[18px] w-[18px]" aria-hidden />
            )}
          </button>
        ) : null}

        {/* Soft scene dots — bottom-start clears Canlı Destek + social rail */}
        {clips.length > 1 && !reduce ? (
          <div
            className="absolute bottom-5 start-5 z-10 flex gap-2 md:bottom-8 md:start-8"
            role="tablist"
            aria-label={labels.scenes}
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

        <div className="relative z-[3] mx-auto flex h-full max-w-7xl items-end px-4 pb-[calc(4.25rem+1rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:px-8 md:pb-[72px] lg:px-8">
          <div className="w-full max-w-[560px]">
            {/* Brand-first — no “kendi markası” / NXTIONSTAR overline above the wordmark */}
            <m.p
              className="font-display text-[clamp(2.1rem,1.45rem+3vw,3.85rem)] font-extrabold leading-[0.94] tracking-[-0.035em] text-white"
              style={{ textShadow: "0 2px 22px rgba(11,27,51,0.4)" }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.08 }}
            >
              {brand}
            </m.p>
            <m.span
              aria-hidden
              className="mt-2.5 block h-0.5 w-9 origin-left bg-[#1E5BB8] sm:mt-3 sm:w-10 rtl:origin-right"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, ease, delay: 0.18 }}
            />

            <m.div
              className="liquid-glass-hero-copy mt-3 px-3.5 py-3.5 sm:mt-5 sm:px-5 sm:py-5"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.28 }}
            >
              <h1 className="text-balance font-display text-[clamp(1.1rem,0.95rem+1vw,1.8rem)] font-bold leading-[1.2] tracking-[-0.02em]">
                {headline}
              </h1>
              <p className="hero-copy-lead mt-2 max-w-[48ch] text-pretty text-[13.5px] font-medium leading-[1.55] sm:mt-3 sm:text-base sm:leading-[1.7]">
                {subcopy}
              </p>
              {points?.length ? (
                <ul className="hero-copy-rule mt-3 space-y-2 border-t pt-3 sm:mt-4 sm:space-y-2.5 sm:pt-3.5">
                  {points.map((point) => (
                    <li
                      key={point.title}
                      className="flex gap-2 text-[13px] leading-[1.45] sm:gap-2.5 sm:text-[15px] sm:leading-[1.6]"
                    >
                      <span className="hero-copy-dot mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
                      <span>
                        <span className="hero-copy-point-title font-semibold">{point.title}: </span>
                        <span className="hero-copy-point-body">{point.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </m.div>

            <m.div
              className="mt-3.5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.4 }}
            >
              <Link
                href={quoteHref}
                className="btn-soft inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1E5BB8] px-6 text-[14px] font-semibold text-white shadow-glow transition duration-500 hover:bg-cyan-600 sm:min-h-12 sm:px-7 sm:text-[15px] md:min-h-[52px] md:text-base"
              >
                {quoteLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="btn-soft inline-flex min-h-11 items-center justify-center rounded-xl border-[1.5px] border-white/80 bg-transparent px-6 text-[14px] font-semibold text-white transition duration-500 hover:bg-white/10 sm:min-h-12 sm:px-7 sm:text-[15px] md:min-h-[52px] md:text-base"
              >
                {secondaryLabel}
              </Link>
            </m.div>
          </div>
        </div>
      </div>
      <span className="sr-only">{clips.map((c) => c.label).join(" · ")}</span>
    </section>
  );
}
