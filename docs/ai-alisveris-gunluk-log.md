# AI alışveriş / GEO — 30 günlük çalışma günlüğü

Hedef: arledscreen.com’u AI alışveriş ajanları için makinece okunabilir lider konumda tutmak.
Spam blog / 81-il doorway yok. Point C = sahibi işletecek üçüncü taraf atıflar.

| Gün | Tarih | İş | Durum |
|-----|-------|-----|-------|
| 16 | 2026-10-05 | CWV mobile smoke + MailerLite heading | ✅ |
| 17 | 2026-10-05 | GSC invalid-schema regression (`audit:schema`) | ✅ |
| 18 | 2026-10-05 | Thin EN noindex + `audit:locale` | ✅ |
| 19 | 2026-10-05 | Case-study photo gaps (`audit:case-images`) | ✅ |
| 20 | 2026-10-05 | GOB vs SMD + ShoppingLinkCloud | ✅ |
| 21 | 2026-10-05 | `groupAggregateOffers` in catalog.json | ✅ |
| 22 | 2026-10-05 | ProductCtaRow + `audit:product-ctas` | ✅ |
| 23 | 2026-10-05 | Sitemap completeness (`audit:sitemap`) | ✅ |
| 24 | 2026-10-05 | Bing/AI bot Allow + Host (`audit:robots`) | ✅ |
| 25 | — | Kör test protokolü (AI shopping sorguları) | ⏳ |
| 26 | — | (plan: llms/entity cite parity smoke) | ⏳ |
| 27 | — | (plan: Merchant feed dry-run / priced panels) | ⏳ |
| 28 | — | (plan: FAQ + commercial LinkCloud gaps) | ⏳ |
| 29 | — | (plan: regression suite tek komut özeti) | ⏳ |
| 30 | 2026-11-04 | Ay sonu ölçüm + owner Point C panosu | ⏳ |

## Gün 24 notları

- `src/app/robots.ts`: `AI_SEARCH_BOTS` + `AI_TRAINING_BOTS`; Host bare `arledscreen.com`
- `scripts/audit-robots.mjs` postbuild’e bağlandı
- `out/robots.txt`: 23 bot + `*` Allow `/`; Host + Sitemap OK
- Canlı robots hâlâ eski Host şemalı olabilir → **PR #55 merge + CF redeploy**

## Owner P0 (her gün hatırlatma)

1. PR #55 merge + Cloudflare Pages redeploy → canlı `/entity.json` `/catalog.json` `/.well-known/ard.json`
2. Point C: GBP + LinkedIn/IG/FB About = playbook pack
3. `arleds.com` → `arledscreen.com/tr/` 301
