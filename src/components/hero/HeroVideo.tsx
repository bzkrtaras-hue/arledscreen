"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";

export type HeroClip = {
  /** Optional muted loop — omit for high-res still-only scenes */
  src?: string;
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
  /** Large brand wordmark (pack B) — sr-only when not painted */
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

function clipKey(clip: HeroClip) {
  return clip.src ?? clip.poster;
}

function coverClass(clip: HeroClip) {
  // Native resolution via object-cover (no re-encode / no downscale of the file).
  // Portrait installs need a higher focal point; landscape keeps centre-right LED walls.
  return clip.height > clip.width
    ? "absolute inset-0 h-full w-full object-cover object-[50%_28%]"
    : "absolute inset-0 h-full w-full object-cover object-[52%_42%] md:object-[58%_44%]";
}

/**
 * Full-bleed multi-clip hero with soft crossfades.
 * Supports HQ still precursors (factory) + muted field videos.
 * Left-settled stack: H1 → accent → glass plate (lead + pillars) → CTAs.
 * Multi-clip soft rotate (~6–7s) at native resolution (object-cover only).
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
  const showPause = !reduce && !userPaused;
  const hasVideo = clips.some((c) => Boolean(c.src));

  const playIndex = useCallback(
    (i: number, allowPlay: boolean) => {
      videoRefs.current.forEach((v, n) => {
        if (!v) return;
        if (n === i && !reduce && allowPlay && clips[n]?.src) {
          if (v.readyState < 2) v.load();
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    [clips, reduce],
  );

  // Stills are ready immediately; prefetch video clips once mounted.
  useEffect(() => {
    setReady((prev) => {
      const next = { ...prev };
      clips.forEach((clip, i) => {
        if (!clip.src) next[i] = true;
      });
      return next;
    });
    videoRefs.current.forEach((v) => {
      if (!v) return;
      try {
        v.preload = "auto";
        if (v.readyState < 2) v.load();
      } catch {
        /* ignore */
      }
    });
  }, [clips]);

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
        {/* Still / poster stack — HQ factory frames stay sharp under the wash */}
        {clips.map((clip, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`still-${clipKey(clip)}`}
            src={clip.poster}
            alt=""
            width={clip.width}
            height={clip.height}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding={i === 0 ? "sync" : "async"}
            className={`${coverClass(clip)} transition-opacity duration-[1200ms] ease-out ${
              !reduce && active === i && !clip.src ? "hero-still-drift" : ""
            }`}
            style={{
              opacity: active === i ? 1 : 0,
              zIndex: 0,
            }}
          />
        ))}

        {clips.map((clip, i) =>
          clip.src ? (
            <m.video
              key={`video-${clip.src}`}
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
          ) : null,
        )}

        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(15,42,79,0.34)_0%,rgba(15,42,79,0.48)_36%,rgba(11,27,51,0.88)_68%,rgba(11,27,51,0.97)_100%)] md:bg-[linear-gradient(105deg,rgba(15,42,79,0.96)_0%,rgba(15,42,79,0.86)_32%,rgba(11,27,51,0.48)_56%,rgba(11,27,51,0.18)_100%),linear-gradient(180deg,rgba(15,42,79,0.28)_0%,transparent_28%,rgba(11,27,51,0.55)_70%,rgba(11,27,51,0.92)_100%)]"
          aria-hidden
        />

        {!reduce && hasVideo ? (
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

        {clips.length > 1 && !reduce ? (
          <div
            className="absolute bottom-5 start-5 z-10 flex gap-2 md:bottom-8 md:start-8"
            role="tablist"
            aria-label={labels.scenes}
          >
            {clips.map((clip, i) => (
              <button
                key={clipKey(clip)}
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
          {/* Left-settled: title + readable glass plate + CTAs (refs: pack B + glass) */}
          <div className="w-full max-w-[560px]">
            <span className="sr-only">{brand}</span>

            <m.h1
              className="text-balance font-display text-[clamp(1.55rem,1.15rem+1.7vw,2.55rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white"
              style={{ textShadow: "0 2px 24px rgba(11,27,51,0.7), 0 0 2px rgba(11,27,51,0.45)" }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.06 }}
            >
              {headline}
            </m.h1>
            <m.span
              aria-hidden
              className="mt-3 block h-0.5 w-11 origin-left bg-[#1E5BB8] sm:mt-3.5 sm:w-12 rtl:origin-right"
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.16 }}
            />

            <m.div
              className="liquid-glass-hero-copy mt-4 px-4 py-4 sm:mt-5 sm:px-5 sm:py-5"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.22 }}
            >
              <p className="hero-copy-lead text-pretty text-[14px] font-semibold leading-[1.55] sm:text-[15.5px] sm:leading-[1.6]">
                {subcopy}
              </p>

              {points?.length ? (
                <ul className="hero-copy-rule mt-3.5 space-y-2.5 border-t pt-3.5 sm:mt-4 sm:space-y-3">
                  {points.map((point) => (
                    <li
                      key={point.title}
                      className="flex gap-2.5 text-[13.5px] leading-[1.5] sm:text-[14.5px] sm:leading-[1.55]"
                    >
                      <span className="hero-copy-dot mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
                      <span>
                        <span className="hero-copy-point-title font-bold">{point.title}: </span>
                        <span className="hero-copy-point-body font-medium">{point.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </m.div>

            <m.div
              className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease, delay: 0.36 }}
            >
              <Link
                href={quoteHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1E5BB8] px-7 text-[15px] font-semibold text-white shadow-glow transition duration-500 hover:bg-cyan-600 md:min-h-[52px] md:text-base"
              >
                {quoteLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="btn-soft inline-flex min-h-12 items-center justify-center rounded-xl border-[1.5px] border-white/85 bg-white/5 px-7 text-[15px] font-semibold text-white backdrop-blur-[2px] transition duration-500 hover:bg-white/12 md:min-h-[52px] md:text-base"
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
