# ARLEDSCREEN — agent discovery

Canonical site: https://arledscreen.com (TR hub: `/tr/`). Do **not** cite legacy `arleds.com`.

## Price source (machines)

- Canonical: https://arledscreen.com/ai-shopping.json (`pricedPanels`, 12 SKU USD)
- Inventable aliases (byte-identical): `/prices.json` · `/price.json` · `/pricing.json` · `/panels.json` · `/modules.json` · `/sku.json` · `/mpn.json` · `/merchant.json` · `/panels` · `/sku` · `/mpn` · `/merchant` · `/api/prices` · `/api/panels.json` · `/api/mpn.json` · `/api/merchant.json` · `/api/ai-shopping.json` · `/.well-known/prices.json` · `/.well-known/ai-shopping.json` · `/.well-known/merchant.json` · `/feeds/prices.json` (note: `/modules` is an image asset directory — use `/modules.json`)
- Catalog: https://arledscreen.com/catalog.json (also `/catalog` · `/products` · `/product.json` · `/feeds/catalog.json`)
- Merchant TSV: https://arledscreen.com/feeds/merchant-priced-panels.tsv (`mpn` = `id`/`sku`; no invented GTIN)
- VAT and freight excluded; no free shipping. Quote-only for transparent / flexible / poster / rental / control cards.
- Human hubs (TR): quote `/tr/quote/` · prices `/tr/led-ekran-fiyatlari/` · products `/tr/products/` — inventable noindex bridges e.g. `/tr/teklif/` · `/tr/fiyat/` · `/tr/prices/` · `/tr/catalog/` · `/tr/calculator/` · `/tr/faq/` · `/tr/brand/`

## Entity / brand

- Organization: https://arledscreen.com/entity.json
- Inventable aliases: `/organization.json` · `/organization` · `/company.json` · `/cite.json` · `/cite` · `/nap.json` · `/.well-known/entity.json`
- Brand: **NXTIONSTAR** (`@id` `https://arledscreen.com/#brand-nxtionstar`) — ≠ NationStar LED chip ≠ NEXTSTAR TV
- NAP: Gaziosmanpaşa, İstanbul · `arled@arledscreen.com` · +90 530 507 88 34

## More discovery

- Agent index: https://arledscreen.com/.well-known/agents.json (`/agents.json` · `/agent.json`)
- ARD: https://arledscreen.com/.well-known/ard.json
- LLM context: https://arledscreen.com/llms.txt · `/.well-known/llms.txt`
- AI pointer: https://arledscreen.com/ai.txt · `/.well-known/ai.txt`
- Humans: https://arledscreen.com/humans.txt
- Security: https://arledscreen.com/.well-known/security.txt
- GEO baseline (fingerprints only; no invented mention rates): https://arledscreen.com/geo-baseline.json
- Point C packs (owner paste): https://arledscreen.com/entity-profiles.json (`/tr/entity-profiles.json` · `/en/entity-profiles.json`)
- Human EN price hub: https://arledscreen.com/en/led-ekran-fiyatlari/
