# ARLEDSCREEN SEO/GEO MASTER IMPLEMENTATION CHECKLIST

On-site items the engineering team can ship in-repo vs off-site owner tasks.
Do **not** invent ratings, certificates, prices outside the published panel list, or city pages without real project records.

## P0 — AI alışveriş / ajan keşfi (emekleme döneminde liderlik)

- [x] `catalog.json` — yayımlanmış panel USD + Product URL (build’de `scripts/generate-ai-catalog.mjs`)
- [x] `entity.json` + `llms.txt` alışveriş FAQ / katalog linki
- [x] `/.well-known/ard.json` (+ legacy `ai-catalog.json`) — Agentic Resource Discovery; CORS açık; `rel=ard` link
- [x] `entity-profiles.json` — Point C paste packs (GBP/LinkedIn/IG/FB); CORS; ARD discovery — [`point-c-merge-day.md`](./point-c-merge-day.md)
- [x] Product Offer guard: `npm run audit:offers` (priced → price+image; quote-only → offers yok; catalog ↔ PANEL_PRICES; fiyat hub + fiyat-hesap hesaplayıcı parity) — postbuild’de çalışır
- [x] GSC invalid-schema regression: `npm run audit:schema` (Offer/AggregateOffer/FAQ/Breadcrumb/no AggregateRating) — postbuild
- [x] Tek komut regression suite: `npm run audit:all` — [`docs/ai-shopping-regression-suite.md`](./ai-shopping-regression-suite.md) (17 audit)
- [x] Ay sonu ölçüm panosu + canlı smoke: [`docs/ai-alisveris-ay-sonu-pano.md`](./ai-alisveris-ay-sonu-pano.md) (`npm run smoke:live`)
- [x] Kör test skor kartı şablonu: [`docs/ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md)
- [x] AI artefact headers: CORS + Content-Type + CORP (`npm run audit:ai-headers`)
- [x] IndexNow key + post-merge Bing ping (`npm run indexnow` · [`docs/indexnow.md`](./indexnow.md))
- [x] Tek-fetch AI alışveriş index: `/ai-shopping.json` + `npm run post-deploy`
- [ ] **Owner:** Google Merchant / Shopping deneyleri (yalnızca fiyatı yayımlanan paneller; uydurma fiyat yok) — checklist: [`docs/merchant-priced-panels.md`](./merchant-priced-panels.md); dry-run TSV: `/feeds/merchant-priced-panels.tsv` (`audit:merchant-feed`)
- [ ] **Owner:** Point C — 10–20 bağımsız kaynakta aynı cite (GBP, dizin, LinkedIn) — packs: `/entity-profiles.json`
- [ ] **Owner:** `arleds.com` → `arledscreen.com/tr/` 301
- [ ] **Owner:** PR #55 merge + CF redeploy → canlı entity/catalog/ard/profiles 200

## P0 — Immediate (site + measurement)

- [x] Commercial intent landings: `/tr/led-ekran/`, satışı, üreticisi, montaj, kiralama, fiyatları, servis
- [x] Use-case + pitch landings (no blog spam)
- [x] City pages only for published provinces (`/tr/bolgeler/…`); Ankara/Ordu not fabricated
- [x] `/` → `/tr/` 301; www → apex; http → https
- [x] Home canonical = `https://arledscreen.com/tr/`; hreflang tr↔en + x-default
- [x] `robots.txt` Allow + Sitemap + bare `Host: arledscreen.com`; Bing/AI bots Explicit Allow — [`docs/robots-ai-bots.md`](./robots-ai-bots.md) (`npm run audit:robots`)
- [x] `sitemap.xml` `application/xml`, includes commercial + case study URLs
- [x] Sitemap completeness guard — [`docs/sitemap-completeness.md`](./sitemap-completeness.md) (`npm run audit:sitemap`; 155 URLs)
- [x] Live technical audit documented in [`docs/technical-seo-audit.md`](./technical-seo-audit.md) (canonical/hreflang/redirects/robots/sitemap PASS)
- [ ] **Owner:** Google Search Console property verified; submit sitemap; review Pages / CWV / HTTPS
- [x] Lab CWV / mobile smoke (home, fiyat, products, 1 case study) — [`docs/cwv-mobile-smoke.md`](./cwv-mobile-smoke.md) (perf 100, LCP ≤1.5s, CLS 0)
- [x] AI alışveriş kör test protokolü (53 prompt + site readiness) — [`docs/ai-shopping-blind-test.md`](./ai-shopping-blind-test.md) (`npm run audit:blind-test`)
- [x] EN thin locale noindex + TR self-canonical audit — [`docs/locale-canonical-audit.md`](./locale-canonical-audit.md) (`npm run audit:locale`)
- [ ] **Owner:** Bing Webmaster Tools sitemap submit

## P0/P1 — On-site content proof

- [x] Price hub `/tr/led-ekran-fiyatlari/` with panel table + worked m² examples (no fake TL packages)
- [x] Calculator `/tr/hesaplayici/` linked as live list source
- [x] Case-study pages for publishable references under `/tr/projelerimiz/<slug>/`
- [x] Case studies omit unknown fields (no fake quotes / control / duration)
- [x] Organization + LocalBusiness + WebSite JSON-LD (NAP verified)
- [x] Product Offer JSON-LD on calculator / fiyat (panel USD only)
- [x] Service + FAQ JSON-LD on commercial / region pages
- [x] `llms.txt` / `llms-full.txt` updated with commercial URLs
- [x] Cite parity: entity.ts ↔ entity.json ↔ llms ↔ about — [`docs/cite-parity.md`](./cite-parity.md) (`npm run audit:cite-parity`)
- [x] `catalog.json` — AI alışveriş için yayımlanmış panel USD + ürün URL (build’de üretilir) + `groupAggregateOffers`
- [ ] Attach more **real** project photos to case studies as files become available — gap list: [`docs/case-study-photo-gaps.md`](./case-study-photo-gaps.md) (8/29 have photos; `audit:case-images`)
- [x] Author / E-E-A-T page for Aras Bozkurt (`/tr/about/aras-bozkurt/` + Person JSON-LD)
- [x] Commercial landings: fiyat + hesaplayıcı + karar rehberi LinkCloud
- [x] Product group FAQ + LinkCloud: catalog/fiyat kaynak hint — [`docs/faq-linkcloud-gaps.md`](./faq-linkcloud-gaps.md)
- [x] Product CTA tutarlılığı: Teklif → WhatsApp → Hesaplayıcı (`ProductCtaRow` + `audit:product-ctas`)
- [x] GOB vs SMD karar rehberi (`/tr/rehber/gob-vs-smd/`) + GOB panel USD tablosu + fiyat/catalog ShoppingLinkCloud
- [x] About sayfası: entity cite + disambiguation (basin UI yok)

## P1 — Local / reviews (owner-operated)

Detaylı playbook: [`docs/offsite-entity-playbook.md`](./offsite-entity-playbook.md)  
Makinece atıf: `/entity.json` · katalog: `/catalog.json` · metin: `/llms.txt`

- [ ] Google Business Profile: categories, hours, WhatsApp, 50+ real photos, services
- [ ] Ethical review request flow after install (no keyword stuffing scripts)
- [ ] GBP posts mirroring each new case study
- [ ] NAP identical on GBP, site footer, llms.txt, LinkedIn, Instagram, Facebook
- [x] Off-site playbook + `entity.json` in repo (public basin sayfası yok)

## P1/P2 — Off-site entity & mentions (owner + PR) — **Point C**

Hedef: “ARLEDSCREEN kimdir?” cevabı **yalnızca kendi siteden** gelmesin; 10–20 güvenilir dış kaynakta aynı olgu doğrulansın.

Durum (2026-10-05): site A/B kod hazır; canlı entity/catalog/ard soft-404 → PR #55; bağımsız C tamamlanan = 0. Tracker: playbook §0d.

- [x] Machine-readable `public/entity.json` (Organization + cite + FAQs)
- [x] Off-site playbook: gap audit + 14-gün P0 sıra + 20-kaynak tracker (yapıştırma metinleri repo içi)
- [x] Point C tracker güncellendi (Site hazır / Sahip durum / sayaç + panosu)
- [ ] **Owner P0:** Canlı `/entity.json` + `/catalog.json` + `/.well-known/ard.json` 200 (2026-10-05 soft-404; PR #55 merge + CF redeploy)
- [ ] **Owner P0:** `arleds.com` → `arledscreen.com/tr/` 301 (entity bölünmesini kes)
- [ ] **Owner P0:** GBP + LinkedIn/IG/FB About = playbook pack (aynı NAP)
- [ ] LinkedIn company + founder posts per major project
- [ ] Instagram / YouTube: install clips with transcript + embed on case study
- [ ] Pitch ARLEDSCREEN to sector lists / AV portals / local news (no spam directories)
- [ ] Ask customers for a project mention/link on their site when appropriate
- [ ] PDF datasheets hosted on-site and cited from product pages (real sheets only)
- [ ] Monitor third-party “Turkey LED manufacturers” lists; request accurate inclusion
- [ ] **Ölçüm:** ayda bir “ARLEDSCREEN kimdir?” → site dışı ≥5–10 URL aynı olguyu taşıyor mu?

## P2 — Content clusters (quality over volume)

- [x] Expand fiyat cluster: P2.5/P4/P5 (+ diğer pitch) yayımlanmış panel USD + catalog FAQ — [`docs/fiyat-cluster-pitch.md`](./fiyat-cluster-pitch.md)
- [x] Decision guide GOB vs SMD + fiyat LinkCloud (Gün 20); izleme mesafesi + kiralama/alışveriş ayrımı (Gün 33)
- [ ] No 100 thin blogs; keep blog as project storytelling only
- [x] Internal link audit: every commercial page → fiyat + calculator + entity/catalog (`audit:shopping-links`)

## P3 — Measurement & iteration

- [ ] GSC query map → page map (commercial intents)
- [ ] Track “Crawled – not indexed” on case studies; thicken only with real media
- [ ] Core Web Vitals pass on mobile for home, fiyat, products, case study
- [ ] Quarterly NAP + schema + llms.txt consistency review

## Explicit non-goals

- [ ] ~~Programmatic 81-city pages~~
- [ ] ~~Fake AggregateRating / Review schema~~
- [ ] ~~Copied Freeled/Sahneva/Armut package prices~~
- [ ] ~~Keyword-stuffed customer reviews~~
- [ ] ~~Buying spam backlinks~~
