# NXTIONSTAR Platform

Production-quality Next.js 15 (App Router) + TypeScript strict B2B LED platform UI for NXTIONSTAR.

## Stack

- Next.js 15 · React 19 · TypeScript (strict)
- Tailwind CSS 3 · Framer Motion · Radix UI (Tabs, Slider, Slot)
- react-hook-form · Zod · lucide-react · CVA / clsx / tailwind-merge

## Run locally

```bash
cd nxtionstar-platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — middleware redirects `/` → `/en`.

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint
```

Locales: `en`, `tr`, `ar`, `ru` (RTL for `ar`).

## Theme

| Token   | Value     |
|---------|-----------|
| bg      | `#050505` |
| surface | `#111111` |
| border  | `#222222` |
| cyan    | `#00F0FF` |
| amber   | `#FFB800` |

Fonts: **Inter** (UI) + **Space Grotesk** (headlines / numbers) via `next/font`.

## Folder tree

```
nxtionstar-platform/
  public/
    hero-placeholder.svg
  src/
    app/
      [locale]/
        layout.tsx
        page.tsx
        products/
          page.tsx
        configurator/
          page.tsx
        quote/
          page.tsx
      layout.tsx
      globals.css
      sitemap.ts
      robots.ts
    components/
      layout/
        Header.tsx
        Footer.tsx
        SiteShell.tsx
        LocaleHtml.tsx
      hero/
        Hero.tsx
        FloatingStatCard.tsx
      configurator/
        LedWallConfigurator.tsx
      calculator/
        PowerInfrastructureCalculator.tsx
      products/
        ProductSeriesGrid.tsx
        ProductCard.tsx
      quote/
        QuoteWizard.tsx
      seo/
        OrganizationJsonLd.tsx
        BreadcrumbJsonLd.tsx
        FaqJsonLd.tsx
      ui/
        button.tsx
        magnetic-button.tsx
        glass-panel.tsx
        section.tsx
    lib/
      utils.ts
      led-math.ts
      i18n.ts
      schemas/
        product.ts
        quote.ts
        cms.ts
    content/
      products.ts
      faqs.ts
    types/
      product.ts
    middleware.ts
  tailwind.config.ts
  next.config.ts
  tsconfig.json
  package.json
  README.md
```

## Key features

1. **Hero** — full-viewport, gradient grid / SVG poster, Framer Motion text reveal, magnetic CTAs, parallax floating stats.
2. **LedWallConfigurator** — width/height sliders, pitch select, cabinet mode, live resolution / aspect / viewing distance / cabinet count (`lib/led-math.ts`).
3. **PowerInfrastructureCalculator** — area + indoor/outdoor → max/avg kW, 3-phase breaker amps, R-S-T + CAT6/Fiber notes.
4. **ProductSeriesGrid** — Radix tabs, glass cards, hover zoom, Quick View Specs overlay.
5. **QuoteWizard** — 3-step Zod-validated form + success state.
6. **SEO** — Organization / Product / Breadcrumb / FAQ JSON-LD, sitemap, robots, hreflang alternates.

## Notes

- Optional muted hero video: place `public/hero.mp4` (poster already wired).
- Do not deploy from this workspace unless explicitly requested.
