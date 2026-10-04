"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronRight,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { PhoneIcon } from "@/components/ui/brand-icons";
import { LocaleSelect } from "@/components/layout/LocaleSelect";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, MOBILE_SOCIAL_IDS } from "@/lib/social";
import { GENERIC_WHATSAPP_HREF } from "@/lib/whatsapp";

export interface MenuGroup {
  href: string;
  name: string;
  family: string;
  short: string;
  tag: string;
  img: string;
  imgAlt: string;
  pitches: { label: string; href: string }[];
}

export interface MenuLink {
  href: string;
  label: string;
}

interface HeaderProps {
  locale: Locale;
  groups: MenuGroup[];
  guides: MenuLink[];
}

const ease = [0.2, 0.7, 0.2, 1] as const;

type Dropdown = null | "products" | "guides";

export function Header({ locale, groups, guides }: HeaderProps) {
  const dict = getDictionary(locale);
  const pathname = usePathname() ?? "";
  const tr = locale === "tr";
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<Dropdown>(null);
  const [active, setActive] = useState(0);
  const [mobileSection, setMobileSection] = useState<Dropdown>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openDrop = useCallback((d: Exclude<Dropdown, null>) => {
    clearTimeout(closeTimer.current);
    setDrop(d);
  }, []);
  const closeDrop = useCallback(() => {
    closeTimer.current = setTimeout(() => setDrop(null), 140);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setDrop(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menus on navigation; lock page scroll while the drawer is open.
  useEffect(() => {
    setOpen(false);
    setDrop(null);
  }, [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links: (MenuLink & { dropdown?: Exclude<Dropdown, null> })[] = tr
    ? [
        { href: "/tr/products/", label: "Ürünler", dropdown: "products" },
        { href: "/tr/hizmetler/", label: "Hizmetler" },
        { href: "/tr/bolgeler/", label: "Bölgeler" },
        { href: "/tr/projelerimiz/", label: "Projeler" },
        { href: "/tr/rehber/", label: "Rehber", dropdown: "guides" },
        { href: "/tr/blog/", label: "Blog" },
        { href: "/tr/about/", label: "Hakkımızda" },
        { href: "/tr/hesaplayici/", label: "Fiyat Hesapla" },
      ]
    : [
        { href: `/${locale}/products/`, label: dict.nav.products },
        { href: `/${locale}/rehber/`, label: "Guides" },
        { href: `/${locale}/about/`, label: dict.nav.about },
        { href: `/${locale}/hesaplayici/`, label: dict.nav.priceCalculator },
      ];

  const isActive = (href: string) => {
    const clean = href.replace(/\/$/, "");
    return pathname === clean || pathname === href || pathname.startsWith(`${clean}/`);
  };

  // Drawer is portalled to <body>: the header's backdrop-filter would otherwise
  // become the containing block for its fixed children and clip it to 68 px.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const group = groups[active] ?? groups[0];

  return (
    <header className="glass-bar border-b border-white/40">
      <div className="mx-auto flex h-[68px] max-w-7xl min-w-0 items-center gap-3 px-4 sm:px-6 md:h-[76px] lg:px-8">
        <Link
          href={`/${locale}/`}
          className="flex min-h-11 min-w-0 shrink-0 items-center gap-2.5 rounded-2xl bg-white/55 px-2.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
          aria-label={tr ? "ARLEDSCREEN ana sayfa" : "ARLEDSCREEN home"}
        >
          <Image
            src="/brand/arledscreen-logo-header-514.webp"
            alt="ARLEDSCREEN"
            width={514}
            height={160}
            className="h-10 w-auto max-w-[150px] object-contain sm:h-11 sm:max-w-[180px]"
            priority
            unoptimized
          />
          <span className="h-8 w-px bg-ink/15" aria-hidden />
          <Image
            src="/brand/nxtionstar-wordmark-header-478.webp"
            alt="NXTIONSTAR"
            width={478}
            height={137}
            className="h-6 w-auto object-contain sm:h-7"
            unoptimized
          />
        </Link>

        <nav className="ml-auto hidden min-w-0 xl:block" aria-label={tr ? "Ana menü" : "Primary"}>
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {links.map((link) =>
              link.dropdown && (link.dropdown === "products" ? groups.length : guides.length) ? (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => openDrop(link.dropdown!)}
                  onMouseLeave={closeDrop}
                >
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={drop === link.dropdown}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onFocus={() => openDrop(link.dropdown!)}
                    className={cn(
                      "nav-glass-link flex min-h-11 items-center gap-1 rounded-full px-3 text-[14px] font-semibold text-ink-soft hover:text-cyan",
                      (drop === link.dropdown || isActive(link.href)) && "text-cyan",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform duration-300", drop === link.dropdown && "rotate-180")}
                      aria-hidden
                    />
                  </Link>
                  <AnimatePresence>
                    {drop === link.dropdown ? (
                      <m.div
                        key={link.dropdown}
                        initial={{ opacity: 0, y: 10, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.99 }}
                        transition={{ duration: 0.28, ease }}
                        className={cn(
                          "absolute top-full z-50 pt-2",
                          link.dropdown === "products" ? "-left-40 w-[780px]" : "-left-6 w-[320px]",
                        )}
                        onMouseEnter={() => openDrop(link.dropdown!)}
                        onMouseLeave={closeDrop}
                      >
                        {link.dropdown === "products" ? (
                          <div className="glass-panel grid grid-cols-[250px_1fr] overflow-hidden rounded-[22px]">
                            <ul className="border-r border-border p-3">
                              {groups.map((g, i) => (
                                <li key={g.href}>
                                  {i === 0 || groups[i - 1].family !== g.family ? (
                                    <p
                                      className={cn(
                                        "px-3 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted",
                                        i === 0 ? "pt-1" : "pt-3",
                                      )}
                                    >
                                      {g.family}
                                    </p>
                                  ) : null}
                                  <Link
                                    href={g.href}
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => {
                                      setActive(i);
                                      openDrop("products");
                                    }}
                                    onBlur={closeDrop}
                                    className={cn(
                                      "nav-glass-link flex min-h-9 items-center justify-between rounded-xl px-3 text-[13.5px] font-semibold",
                                      i === active ? "text-cyan-700" : "text-ink-soft",
                                    )}
                                  >
                                    {g.name}
                                    <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
                                  </Link>
                                </li>
                              ))}
                              <li className="mt-2 border-t border-border pt-2">
                                <Link
                                  href="/tr/hizmetler/"
                                  onBlur={closeDrop}
                                  className="flex min-h-10 items-center rounded-xl px-3 text-[13.5px] font-semibold text-ink-soft hover:bg-band"
                                >
                                  Montaj ve teknik servis
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/tr/products/"
                                  onBlur={closeDrop}
                                  className="flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-[13.5px] font-bold text-cyan hover:bg-band"
                                >
                                  Tüm ürünler <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                                </Link>
                              </li>
                            </ul>
                            {group ? (
                              <div className="grid grid-cols-[1fr_200px] gap-5 p-5">
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                                    {group.tag}
                                  </p>
                                  <p className="mt-1 font-display text-lg font-bold text-ink">{group.name}</p>
                                  <p className="mt-1.5 text-[13.5px] leading-6 text-ink-muted">{group.short}</p>
                                  {group.pitches.length ? (
                                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Modeller">
                                      {group.pitches.map((p) => (
                                        <li key={p.href}>
                                          <Link
                                            href={p.href}
                                            onFocus={() => openDrop("products")}
                                            onBlur={closeDrop}
                                            className="inline-flex min-h-8 items-center rounded-lg bg-band px-2.5 text-[12px] font-semibold text-ink-soft transition hover:bg-cyan hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                                          >
                                            {p.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                  <Link
                                    href={group.href}
                                    tabIndex={-1}
                                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-cyan hover:text-cyan-700"
                                  >
                                    Sayfayı inceleyin <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                                  </Link>
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={group.img}
                                  alt={group.imgAlt}
                                  width={200}
                                  height={240}
                                  loading="lazy"
                                  className="h-full max-h-[240px] w-full rounded-2xl object-cover"
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <ul className="glass-panel overflow-hidden rounded-[22px] p-3">
                            {guides.map((g) => (
                              <li key={g.href}>
                                <Link
                                  href={g.href}
                                  onFocus={() => openDrop("guides")}
                                  onBlur={closeDrop}
                                  className="nav-glass-link flex min-h-10 items-center gap-2 rounded-xl px-3 text-[13.5px] font-semibold text-ink-soft hover:text-cyan"
                                >
                                  <BookOpen className="h-4 w-4 text-cyan" aria-hidden />
                                  {g.label}
                                </Link>
                              </li>
                            ))}
                            <li className="mt-2 border-t border-border pt-2">
                              <Link
                                href="/tr/rehber/"
                                onBlur={closeDrop}
                                className="flex min-h-10 items-center gap-1.5 rounded-xl px-3 text-[13.5px] font-bold text-cyan hover:bg-band"
                              >
                                Tüm rehberler <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                              </Link>
                            </li>
                          </ul>
                        )}
                      </m.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "nav-glass-link flex min-h-11 items-center rounded-full px-3 text-[14px] font-semibold text-ink-soft hover:text-cyan",
                      isActive(link.href) && "text-cyan",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link
          href={`/${locale}/quote/`}
          className="btn-soft ml-auto hidden min-h-11 shrink-0 items-center gap-2 rounded-full bg-cyan px-5 text-[14px] text-white shadow-pill hover:bg-cyan-600 sm:inline-flex xl:ml-3"
        >
          <FileText className="h-4 w-4" aria-hidden />
          {dict.nav.quote}
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan text-white shadow-pill transition hover:bg-cyan-600 sm:ml-0 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{tr ? "Menüyü aç" : "Open menu"}</span>
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {mounted
        ? createPortal(
      <AnimatePresence>
        {open ? (
          <m.div
            key="drawer"
            className="fixed inset-0 z-[60] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 h-full w-full bg-navy/40 backdrop-blur-[2px]"
              aria-label={tr ? "Menüyü kapat" : "Close menu"}
              onClick={() => setOpen(false)}
            />
            <m.nav
              id="mobile-nav"
              aria-label={tr ? "Mobil menü" : "Mobile"}
              className="glass-panel glass-strong absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col overflow-y-auto rounded-l-[24px] border-l border-white/50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease }}
            >
              <div className="flex h-[68px] items-center justify-between border-b border-white/40 px-4">
                <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-ink-muted">
                  {tr ? "Menü" : "Menu"}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="nav-glass-link inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-soft"
                >
                  <span className="sr-only">{tr ? "Menüyü kapat" : "Close menu"}</span>
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-3 py-3">
                {links.map((link) => {
                  const sub =
                    link.dropdown === "products"
                      ? groups.map((g) => ({ href: g.href, label: g.name }))
                      : link.dropdown === "guides"
                        ? guides
                        : [];
                  if (sub.length) {
                    const expanded = mobileSection === link.dropdown;
                    return (
                      <li key={link.href}>
                        <div className="flex items-center">
                          <Link
                            href={link.href}
                            className="nav-glass-link flex min-h-12 flex-1 items-center rounded-xl px-3 text-base font-semibold text-ink"
                          >
                            {link.label}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={expanded}
                            onClick={() => setMobileSection(expanded ? null : link.dropdown!)}
                            className="nav-glass-link inline-flex h-12 w-12 items-center justify-center rounded-xl text-ink-soft"
                          >
                            <span className="sr-only">
                              {link.label} {tr ? "alt menüsü" : "submenu"}
                            </span>
                            <ChevronDown className={cn("h-5 w-5 transition-transform", expanded && "rotate-180")} aria-hidden />
                          </button>
                        </div>
                        {expanded ? (
                          <ul className="mb-2 ml-3 border-l-2 border-cyan-100 pl-2">
                            {sub.map((s) => (
                              <li key={s.href}>
                                <Link
                                  href={s.href}
                                  className="flex min-h-11 items-center rounded-lg px-3 text-[15px] text-ink-soft hover:bg-band hover:text-cyan"
                                >
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={cn(
                          "nav-glass-link flex min-h-12 items-center rounded-xl px-3 text-base font-semibold text-ink",
                          isActive(link.href) && "text-cyan",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto space-y-3 border-t border-border px-4 py-5">
                <Link
                  href={`/${locale}/quote/`}
                  className="btn-soft flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cyan text-white hover:bg-cyan-600"
                >
                  <FileText className="h-4 w-4" aria-hidden />
                  {dict.nav.quote}
                </Link>
                <a
                  href={GENERIC_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-soft flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#0F7A41]/40 bg-white text-[#0F7A41] hover:bg-[#0F7A41]/10"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {tr ? "WhatsApp'tan yazın" : "Message on WhatsApp"}
                </a>
                <div className="flex items-center justify-between gap-3 pt-1">
                  <a href={CONTACT_PHONE_HREF} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
                    <PhoneIcon className="h-4 w-4 text-cyan" />
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                  {tr ? (
                    <Link href="/tr/hesaplayici/" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cyan">
                      <Calculator className="h-4 w-4" aria-hidden />
                      Fiyat hesapla
                    </Link>
                  ) : null}
                </div>
                <SocialLinks ids={MOBILE_SOCIAL_IDS} size="md" />
                <LocaleSelect locale={locale} id="locale-select-mobile" size="md" />
              </div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
