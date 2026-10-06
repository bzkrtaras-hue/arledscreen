"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OptImage } from "@/components/ui/opt-image";
import { YIYISTAR_GALLERY } from "@/content/yiyistar-gallery";
import { cn } from "@/lib/utils";

/**
 * Application gallery — same logic as yiyistar.com/gallery
 * (featured strip + category jump + square grids), ARLEDSCREEN styling.
 */
export function YiyistarGallery({
  showFeatured = true,
  showJumpNav = true,
  limitSections,
}: {
  showFeatured?: boolean;
  showJumpNav?: boolean;
  /** When set, only the first N category blocks render (teaser use). */
  limitSections?: number;
}) {
  const reduce = useReducedMotion();
  const sections = useMemo(
    () =>
      typeof limitSections === "number"
        ? YIYISTAR_GALLERY.slice(0, limitSections)
        : YIYISTAR_GALLERY,
    [limitSections],
  );
  const featured = useMemo(
    () =>
      sections.map((section) => ({
        src: section.images[0],
        title: section.title,
        slug: section.slug,
      })).filter((s) => Boolean(s.src)),
    [sections],
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(sections[0]?.slug ?? "");

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((i) => (i + dir + featured.length) % featured.length);
    },
    [featured.length],
  );

  useEffect(() => {
    if (reduce || paused || !showFeatured || featured.length < 2) return;
    const id = window.setInterval(() => go(1), 5200);
    return () => window.clearInterval(id);
  }, [featured.length, go, paused, reduce, showFeatured]);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(`galeri-${section.slug}`))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id.replace("galeri-", "");
        if (id) setCurrentSlug(id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (slug: string) => {
    const el = document.getElementById(`galeri-${slug}`);
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="space-y-10 md:space-y-14">
      {showFeatured && featured.length ? (
        <div
          className="relative isolate overflow-hidden rounded-2xl bg-navy shadow-[0_18px_50px_-24px_rgba(11,27,51,0.55)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[2/1] w-full sm:aspect-[21/9]">
            {featured.map((slide, i) => (
              <m.div
                key={slide.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.85, ease: [0.22, 0.65, 0.2, 1] }}
                aria-hidden={i !== active}
              >
                <OptImage
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/75 via-[#0B1B33]/15 to-transparent"
                  aria-hidden
                />
              </m.div>
            ))}
          </div>

          <p className="absolute bottom-4 left-4 max-w-[min(100%-5rem,28rem)] rounded-md bg-[#0B1B33]/78 px-3 py-2 text-sm font-semibold text-white backdrop-blur-sm sm:bottom-5 sm:left-5 sm:text-[15px]">
            {featured[active]?.title}
          </p>

          {featured.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur hover:bg-white sm:left-3"
                aria-label="Önceki görsel"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur hover:bg-white sm:right-3"
                aria-label="Sonraki görsel"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
              <div className="absolute bottom-4 right-4 flex gap-1.5 sm:bottom-5 sm:right-5">
                {featured.map((slide, i) => (
                  <button
                    key={slide.slug}
                    type="button"
                    aria-label={`${slide.title} slaytı`}
                    aria-current={i === active}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === active ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70",
                    )}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

      {showJumpNav ? (
        <nav
          aria-label="Galeri kategorileri"
          className="sticky top-16 z-30 -mx-1 border-b border-border/80 bg-white/95 px-1 py-3 backdrop-blur"
        >
          <ul className="flex gap-2 overflow-x-auto pb-0.5">
            {sections.map((section) => (
              <li key={section.slug}>
                <button
                  type="button"
                  onClick={() => scrollTo(section.slug)}
                  aria-current={section.slug === currentSlug ? "true" : undefined}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-[13px] font-semibold transition",
                    section.slug === currentSlug
                      ? "border-cyan bg-cyan text-white"
                      : "border-border bg-white text-ink-soft hover:border-cyan/45 hover:text-cyan",
                  )}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <div className="space-y-12 md:space-y-16">
        {sections.map((section) => (
          <section
            key={section.slug}
            id={`galeri-${section.slug}`}
            className="scroll-mt-28"
          >
            <h2 className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em] text-ink sm:text-2xl">
              {section.title}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {section.images.map((src) => (
                <li key={src}>
                  <figure className="group relative aspect-square overflow-hidden rounded-lg bg-surface">
                    <OptImage
                      src={src}
                      alt={`${section.title} uygulama görseli`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
