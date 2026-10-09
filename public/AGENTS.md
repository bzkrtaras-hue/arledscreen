# ARLEDSCREEN — agent discovery

Canonical site: https://arledscreen.com (TR hub: `/tr/`). Do **not** cite legacy `arleds.com`.

## Price source (machines)

- Canonical: https://arledscreen.com/ai-shopping.json (`pricedPanels`, 12 SKU USD)
- Inventable aliases (byte-identical): `/prices.json` · `/price.json` · `/pricing.json` · `/panels.json` · `/modules.json` · `/sku.json` · `/mpn.json` · `/merchant.json` · `/offer.json` · `/offers.json` · `/dataset.json` · `/feed.json` · `/panels` · `/sku` · `/mpn` · `/merchant` · `/offer` · `/offers` · `/dataset` · `/feed` · `/modules` · `/api/prices` · `/api/prices.json` · `/api/panels.json` · `/api/mpn` · `/api/mpn.json` · `/api/merchant.json` · `/api/ai-shopping` · `/api/ai-shopping.json` · `/api/v1/prices` · `/v1/prices` · `/v1/panels` · `/v1/mpn` · `/v1/sku` · `/data/prices.json` · `/en/prices.json` · `/tr/prices.json` · `/en/pricing.json` · `/tr/pricing.json` · `/en/ai-shopping.json` · `/tr/ai-shopping.json` · `/en/feed.json` · `/tr/feed.json` · `/.well-known/prices.json` · `/.well-known/price.json` · `/.well-known/pricing.json` · `/.well-known/panels.json` · `/.well-known/modules.json` · `/.well-known/sku.json` · `/.well-known/mpn.json` · `/.well-known/merchant.json` · `/.well-known/offer.json` · `/.well-known/offers.json` · `/.well-known/dataset.json` · `/.well-known/feed.json` · `/.well-known/ai-shopping.json` · `/feeds/prices.json` (note: `/modules` + `/brand` are Pages Function invent aliases; `/modules/*` + `/brand/*` asset dirs stay intact)
- Catalog: https://arledscreen.com/catalog.json (`@type` Collection+OfferCatalog; also `/catalog` · `/products` · `/product` · `/product.json` · `/api/catalog` · `/api/catalog.json` · `/api/products` · `/en/catalog.json` · `/tr/catalog.json` · `/feeds/catalog.json` · `/data/catalog.json`)
- Merchant TSV: https://arledscreen.com/feeds/merchant-priced-panels.tsv (`mpn` = `id`/`sku`; Brand columns `brand_id` · `brand_makes_offer_id` · `brand_has_offer_catalog`; join columns `product_ld_id` · `catalog_id` · `offer_id` · `catalog_offer_id` · `local_business_id`; no invented GTIN)
- Price RSS: https://arledscreen.com/feeds/prices.rss (12 SKU panel USD change feed; canonical graph remains ai-shopping.json)
- Graph: Offer triangle catalog ↔ ai-shopping ↔ PDP `#offer`; every Offer `itemOffered` → PDP `#product`; Dataset `hasPart` stubs → Offer `@id`; Offer/AggregateOffer `availableAtOrFrom` → `#localbusiness`
- VAT and freight excluded; no free shipping. Quote-only for transparent / flexible / poster / control cards. Indoor and outdoor rental LED: USD 50 per m² per day. Installation and shipping are quoted separately. Warranty: ARLEDSCREEN offers a 2-year warranty and 5 years of free technical service.
- Human hubs (TR): quote `/tr/quote/` · prices `/tr/led-ekran-fiyatlari/` · products `/tr/products/` — inventable noindex bridges e.g. `/tr/teklif/` · `/tr/fiyat/` · `/tr/prices/` · `/tr/catalog/` · `/tr/calculator/` · `/tr/faq/` · `/tr/brand/`
- Human hubs (EN): quote `/en/quote/` · prices `/en/led-ekran-fiyatlari/` · products `/en/products/` — inventable noindex bridges e.g. `/en/calculator/` · `/en/catalog/` · `/en/shop/` · `/en/request-quote/` · `/en/faq/` · `/en/brand/` · `/en/teklif/` · `/en/products/gob/`

## Entity / brand

- Organization: https://arledscreen.com/entity.json
- Inventable aliases: `/organization.json` · `/organization` · `/company.json` · `/company` · `/cite.json` · `/cite` · `/nap.json` · `/nap` · `/api/entity` · `/api/entity.json` · `/en/entity.json` · `/tr/entity.json` · `/.well-known/entity.json` · `/.well-known/organization.json`
- Entity price path: `makesOffer` AggregateOffer `#priced-panels-aggregate` + `offers`×12 → `ai-shopping.json#offer-{sku}` (each with `itemOffered` → PDP `#product`); `hasOfferCatalog` → `catalog.json`; `location` → `#localbusiness`
- Brand document: https://arledscreen.com/brand.json (`@type` Brand `#brand-nxtionstar` — `makesOffer` → `#priced-panels-aggregate`; `hasOfferCatalog` → `catalog.json`; ≠ NationStar LED chip ≠ NEXTSTAR TV; invent aliases `/brand` · `/.well-known/brand.json`)
- WebSite JSON-LD: `entity.json` `mainEntityOfPage` `#website` (`https://arledscreen.com/#website`) OrderAction → `/tr/quote/` · `/en/quote/`; `about` → `#organization`; home Speakable `mainEntity` → `/tr/#service` · `/en/#service`
- NAP: Gaziosmanpaşa, İstanbul · `arled@arledscreen.com` · +90 530 507 88 34
- Social (owner-confirmed): WhatsApp `@arledscreen` · Instagram `@arledscreen` · Facebook `@arledscreenn` — machine: https://arledscreen.com/social.json (`/contact.json` · `/social` · `/.well-known/social.json` · `/.well-known/contact.json`; note `/contact` is HTML invent bridge); click-to-chat `https://wa.me/905305078834` (WhatsApp @username has no public wa.me deep-link)

## More discovery

- Agent index: https://arledscreen.com/.well-known/agents.json (`/agents.json` · `/agent.json`)
- ARD: https://arledscreen.com/.well-known/ard.json
- LLM context: https://arledscreen.com/llms.txt · `/llms` · `/llms-full` · `/.well-known/llms.txt` · `/llms-full.txt` · `/.well-known/llms-full.txt` · `/en/llms.txt` · `/tr/llms.txt`
- AI pointer: https://arledscreen.com/ai.txt · `/.well-known/ai.txt` · `/en/ai.txt` · `/tr/ai.txt`
- Humans: https://arledscreen.com/humans.txt
- Security: https://arledscreen.com/.well-known/security.txt · `/security.txt` · `/.well-known/security`
- GEO baseline (fingerprints only; no invented mention rates): https://arledscreen.com/geo-baseline.json (`/geo-baseline` · `/en/geo-baseline.json` · `/tr/geo-baseline.json` · `/.well-known/geo-baseline.json`)
- Human EN price hub: https://arledscreen.com/en/led-ekran-fiyatlari/
