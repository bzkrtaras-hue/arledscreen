# ARLEDSCREEN homepage hero — full-bleed video placement

Art direction for the TR/EN/AR/RU home hero. Replaces the inset rounded photo carousel.

**Art direction:** LED wall as the brand surface. Navy protects type. Corporate blue is the only action colour. Copy lives bottom-left. Motion is quiet.

---

## Reject (do not ship)

| Anti-pattern | Why |
|---|---|
| `max-w-7xl` clipped media, `rounded-hero`, `shadow-hero` | Card-in-a-page = SaaS marketing, not a display manufacturer |
| `glass-dark` / `glass-pill` / `backdrop-blur` on hero chrome | Frosted pills are dashboard UI |
| `rounded-full` CTAs, white primary, frosted secondary | Pill buttons belong to the old hero |
| Badge chips (“Enterprise”, slogan in a capsule) | SaaS lede, not brand lockup |
| `FloatingStatCard` / glass stats | Product landing kit |
| Carousel dots, chevrons, swipe, Ken Burns stills | Extra chrome over the footage |
| Vertically centred or centre-centre copy | Fights the video; ignores the safe zone |
| Magnetic / parallax hover on the stage | Fourth motion. Out of budget |

---

## Tokens (already in `tailwind.config.ts`)

| Role | Value |
|---|---|
| Navy | `#0F2A4F` (`navy`) |
| Overlay deep | `#0B1B33` |
| Primary CTA | `#1E5BB8` (`cyan`) |
| Primary hover | `#184A96` (`cyan-600`) |
| Type | Montserrat, `--font-montserrat` |
| CTA radius | `rounded-xl` = **12px** |
| Hairline accent | `#1E5BB8`, 2 × 40 px |

Do not introduce a second blue. WhatsApp green stays off this stage.

---

## Footage

Single clip (do not dual-source desktop/mobile):

- File: `/videos/eskisehir-sigorta-led-ekran-vitrin.mp4` (~1 MB, 1280×720, H.264, muted, loop, `playsInline`)
- Poster: `/videos/eskisehir-sigorta-led-ekran-vitrin.jpg` (LCP; `fetchPriority="high"`)
- `object-fit: cover` always
- **1440 object-position:** `68% 42%` — LED wall sits in the open right half
- **390 object-position:** `50% 28%` — screens stay in the upper half, above the copy wash

Decorative: `aria-hidden` on the `<video>`. Control is the pause button.

`prefers-reduced-motion: reduce` → poster only, video stays `opacity: 0`, button is **Play**.

---

## Chrome (outside the stage)

Hero starts **below** TopBar + Header (header stays opaque glass; do not slide video under it).

| | TopBar | Header | Chrome | Hero height formula |
|---|---|---|---|---|
| Desktop 1440 | 40 | 76 | **116** | `clamp(640px, calc(100dvh - 116px), 860px)` |
| Mobile 390 | 40 | 68 | **108** | `calc(100dvh - 108px)` (min 560) |

Assumed viewports for the pixel maps below:

- Desktop: **1440 × 900** → hero **1440 × 784**
- Mobile: **390 × 844** → hero **390 × 736**

Fixed **MobileCtaBar** (md hidden) is 72 px + safe-area and overlays the bottom of the 390 viewport. Copy must clear it.

---

## Overlay (navy, not glass)

No `backdrop-filter`. Two stacked linear gradients, pointer-events none.

**1440 — keep the right third of the wall readable**

```
linear-gradient(105deg,
  rgba(15,42,79,0.94) 0%,
  rgba(15,42,79,0.78) 34%,
  rgba(11,27,51,0.42) 58%,
  rgba(11,27,51,0.16) 100%)

linear-gradient(180deg,
  rgba(15,42,79,0.22) 0%,
  transparent 30%,
  rgba(11,27,51,0.50) 70%,
  rgba(11,27,51,0.88) 100%)
```

**390 — bottom wash for the stacked copy**

```
linear-gradient(180deg,
  rgba(15,42,79,0.28) 0%,
  rgba(15,42,79,0.40) 38%,
  rgba(11,27,51,0.84) 70%,
  rgba(11,27,51,0.96) 100%)
```

White text on this wash must stay ≥ WCAG AA. Do not fade the overlay in (text would flash). Overlay is present on first paint.

---

## Copy safe zone — bottom left

Copy aligns to the same `max-w-7xl` + `lg:px-8` inset as the header logo. Video ignores that inset (full bleed).

### Desktop 1440 × 784

```
Safe zone box
  x: 112          (80 page margin + 32 lg:px-8 — matches header lockup)
  y: 784 − 72 − H
  w: 560
  bottom inset: 72
  right of box: 672  →  768 px of open video on the right
```

Stack, top → bottom, left-aligned:

| El | Spec |
|---|---|
| Lockup | `ARLEDSCREEN` + 1×12 `#1E5BB8` rule + `NXTIONSTAR`. 12 px / 700 / uppercase / tracking 0.20em / `#FFFFFF`. No pill, no glass. |
| Accent | 40 × 2 px `#1E5BB8`. 12 px below lockup. Motion 3. |
| H1 | Dictionary headline. 56–64 px / 800 / leading 1.06 / tracking −0.03em / white. `text-balance`. Max 2–3 lines. |
| Subcopy | Dictionary subcopy. 16–18 px / 400 / leading 1.65 / `rgba(255,255,255,0.90)`. Max 36ch. |
| CTAs | 24 px above buttons. Row, 12 px gap. |

Do not render `hero.badge` (that string is the old pill). Slogan already lives in TopBar.

**RTL (`ar`):** mirror the box to bottom-right (`inset-inline-start`). Accent `origin-right`. Pause flips to `inset-inline-end` opposite the copy.

### Mobile 390 × 736

```
Safe zone box
  x: 20
  y: 736 − 96 − H     (96 = 72 MobileCtaBar + 24 gap)
  w: 350              (390 − 40)
  bottom inset: 96 + env(safe-area-inset-bottom)
```

Same stack, stacked CTAs (full 350 width, 10 px gap). H1 32–36 px. Subcopy 15 px / leading 1.6. Lockup 11 px.

---

## CTAs

| | Primary | Secondary |
|---|---|---|
| Label | `hero.ctaQuote` | `hero.ctaConfigure` |
| Fill | `#1E5BB8` | transparent |
| Text | `#FFFFFF` | `#FFFFFF` |
| Border | none | 1.5 px `rgba(255,255,255,0.70)` |
| Radius | **12 px (`rounded-xl`)** | same |
| Height | 52 (desktop) / 48 (390) | same |
| Pad | 28 × 0 | 28 × 0 |
| Hover | `#184A96`, `translateY(-2px)` via `.btn-soft` | `bg-white/10` |
| Icon | none (no Plus, no pill) | optional Calculator, 16 px |

Focus: 2 px `#FFFFFF` ring, 2 px offset (on navy this is the visible ring).

---

## Pause control

One control. Not a centre play overlay.

| | 1440 | 390 |
|---|---|---|
| Size | 44 × 44 hit; 40 × 40 glyph well | 44 × 44 |
| Radius | 12 px | 12 px |
| Fill | `#0F2A4F` at 80% | same |
| Border | 1 px `rgba(255,255,255,0.25)` | same |
| Icon | Pause when playing; Play when paused. 18 px white | same |
| Position | **top-right** `right: 32`, `top: 32` (clears copy, chat widget, social rail) | **top-right** `right: 16`, `top: 16` (copy owns the bottom) |

`aria-pressed={playing}`. Labels: TR `Duraklat` / `Oynat`; EN `Pause` / `Play`.

Also pause when the tab is hidden or the stage leaves the viewport (threshold 0.25). Top-right on both breakpoints: bottom-right collides with Canlı Destek and the social rail.

---

## Motions (exactly three)

| # | What | Timing | Reduced motion |
|---|---|---|---|
| 1 | Copy stack: fade + 18 px up, stagger 80 ms (lockup → H1 → subcopy → CTAs) | 700 ms, ease `[0.2, 0.7, 0.2, 1]`, delayChildren 120 ms | Opacity only, no Y |
| 2 | Video fades onto the poster once `canplay` | 600 ms, same ease | Video stays hidden; poster is the frame |
| 3 | Accent rule `scaleX 0 → 1`, origin inline-start | 550 ms, delay 150 ms | Instant full width |

Out of budget: Ken Burns, overlay fade, carousel, magnetic, stat parallax, looping underline.

Hover on `.btn-soft` is a control state, not a fourth stage motion.

---

## Pixel map — 1440 × 784 stage

```
0                                                                1440
┌──────────────────────────────────────────────────────────────────┐ 0
│  VIDEO  object-position 68% 42%               [pause]  1364, 32  │
│  overlay 105deg navy → open right                                │
│                                                                  │
│  112, ~320                                                       │
│  ┌─────────────────────────────┐                                 │
│  │ ARLEDSCREEN │ NXTIONSTAR    │  w 560                          │
│  │ ████  accent 40×2           │                                 │
│  │ H1  (2–3 lines)             │                                 │
│  │ Subcopy ≤36ch               │                                 │
│  │ [ Teklif İste ] [ Hesapla ] │  h 52, radius 12, #1E5BB8       │
│  └─────────────────────────────┘                                 │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘ 784
         ↑ left inset 112                          right inset 32
```

Pause coordinates: `(1440 − 32 − 44, 32)` = **(1364, 32)** — top-right of the stage, clear of the Canlı Destek bubble and the social rail.

---

## Pixel map — 390 × 736 stage

```
0                          390
┌──────────────────────────┐ 0
│            [pause 44]    │  16, 16  →  (330, 16)
│  VIDEO  object-pos 50% 28│
│                          │
│  bottom navy wash        │
│  20, ~400                │
│  ┌────────────────────┐  │
│  │ ARLEDSCREEN│NXTION │  │  w 350
│  │ ████               │  │
│  │ H1 32–36           │  │
│  │ Subcopy 15         │  │
│  │ [ Teklif İste    ] │  │  h 48, radius 12, full width
│  │ [ Fiyatı Hesapla ] │  │
│  └────────────────────┘  │
│          96 px clear     │
└──────────────────────────┘ 736
     MobileCtaBar overlays 844-72…844
```

Copy bottom edge at **y = 736 − 96 = 640**, so it sits 24 px above the 72 px bar.

---

## Implementation notes

- Stage: `relative isolate w-full overflow-hidden bg-navy` — **no** `max-w-*`, **no** radius, **no** outer page padding.
- Copy wrapper: `mx-auto flex h-full max-w-7xl items-end px-4 sm:px-6 lg:px-8`.
- Poster `<img>` is LCP; `<video>` sits on top at opacity 0 until `canplay`.
- Gateway tiles under the hero: restore `pt-10 md:pt-14` (the old `pt-4` assumed an inset card).
- `hero.badge` stays in the dictionary for other surfaces; hero lockup is the two brand names.

---

## QA checklist

- [ ] 1440: video reaches both side edges; header logo and H1 share the 112 px inset
- [ ] 1440: right ~768 px of LED wall still reads through the overlay
- [ ] 390: copy is not under MobileCtaBar; pause is top-right, not over H1
- [ ] Primary CTA is `#1E5BB8` and `border-radius: 12px` — never pill, never white
- [ ] Pause toggles playback; tab hide pauses; reduced-motion never autoplays
- [ ] No glass, no carousel chrome, no floating stats
- [ ] `ar` locale mirrors the safe zone
