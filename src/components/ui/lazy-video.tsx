"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LazyVideoProps {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  /** Plays muted while in view (use for at most one video per page). */
  autoPlayInView?: boolean;
  className?: string;
}

const EVT = "arled-video-play";

/**
 * Muted, looping, inline video with preload="none". The poster is attached only
 * when the element approaches the viewport. Tap to play; optional in-view autoplay.
 */
export function LazyVideo({ src, poster, width, height, label, autoPlayInView = false, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const nearIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          nearIo.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    nearIo.observe(v);
    let playIo: IntersectionObserver | undefined;
    if (autoPlayInView && !reduce) {
      playIo = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        },
        { threshold: 0.5 },
      );
      playIo.observe(v);
    }
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== v && !autoPlayInView) v.pause();
    };
    window.addEventListener(EVT, onOther);
    return () => {
      nearIo.disconnect();
      playIo?.disconnect();
      window.removeEventListener(EVT, onOther);
    };
  }, [autoPlayInView]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      window.dispatchEvent(new CustomEvent(EVT, { detail: v }));
      v.play().catch(() => {});
    } else v.pause();
  };

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <video
        ref={ref}
        src={src}
        poster={near ? poster : undefined}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `${label}: duraklat` : `${label}: oynat`}
        className={cn(
          "absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white",
          playing && "pointer-events-none opacity-0",
        )}
      >
        {playing ? <Pause className="h-6 w-6" aria-hidden /> : <Play className="ml-0.5 h-6 w-6" aria-hidden />}
      </button>
    </div>
  );
}
