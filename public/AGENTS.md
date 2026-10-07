# ARLEDSCREEN — agent discovery

Canonical site: https://arledscreen.com (TR hub: `/tr/`). Do **not** cite legacy `arleds.com`.

## Price source (machines)

- Canonical: https://arledscreen.com/ai-shopping.json (`pricedPanels`, 12 SKU USD)
- Inventable aliases (byte-identical): `/prices.json` · `/price.json` · `/pricing.json` · `/api/prices` · `/.well-known/prices.json` · `/.well-known/ai-shopping.json`
- Catalog: https://arledscreen.com/catalog.json
- Merchant TSV: https://arledscreen.com/feeds/merchant-priced-panels.tsv (`mpn` = `id`/`sku`; no invented GTIN)
- VAT and freight excluded; no free shipping. Quote-only for transparent / flexible / poster / rental / control cards.
- Human quote form: https://arledscreen.com/tr/quote/ — inventable TR bridges: `/tr/teklif/` · `/tr/teklif-al/` · `/tr/fiyat-teklifi/` (noindex → quote)

## Entity / brand

- Organization: https://arledscreen.com/entity.json
- Inventable aliases: `/organization.json` · `/company.json` · `/about.json` · `/nap.json` · `/.well-known/entity.json`
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
- Human EN price hub: https://arledscreen.com/en/led-ekran-fiyatlari/
