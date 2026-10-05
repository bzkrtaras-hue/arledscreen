# IndexNow — AI alışveriş artefact recrawl (Gün 46)

Amaç: PR #55 deploy sonrası Bing (ve IndexNow ortakları) soft-404’ten çıkan
`entity.json` / `catalog.json` / `ard.json` / Merchant TSV yüzeylerini **hemen** yeniden tarasın.

Spam blog / 81-il yok. Yalnızca yayımlanmış fiyat + kimlik URL’leri pinglenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `public/<key>.txt` | IndexNow doğrulama (içerik = key) |
| `scripts/lib/indexnow-urls.mjs` | URL listesi (tek kaynak) |
| `scripts/indexnow-ping.mjs` | Dry-run / `--live` POST |
| `scripts/audit-indexnow.mjs` | Key + URL list completeness + out/ artefact |

## Kullanım (merge günü)

```bash
npm run smoke:live          # 14/14 PASS olmalı
npm run smoke:local         # pre-merge: aynı mustInclude → out/
npm run verify:premerge     # smoke:local + point-c + pricedPanels
npm run indexnow            # dry-run: URL listesi
npm run indexnow -- --live  # Bing IndexNow API
```

Başarı: HTTP **200** veya **202**.

## Ping listesi (özet)

- Machine: ai-shopping · entity · entity-profiles · catalog · ard · ai-catalog · llms · llms-full · merchant TSV · sitemap
- İnsan: `/tr/` · fiyat · hesaplayıcı · yapay-zeka · about · quote · products · hizmetler · sss · nxtionstar · blog · rehber hub + örnek rehberler

## Notlar

- Key dosyası Functions dışında (statik export); `_routes.json` include yalnızca `/`
- Canlı key 200 değilse IndexNow 422 döner — önce CF redeploy doğrula
- Guard: `npm run audit:indexnow` (postbuild + `audit:all`) — URL listesi `out/` artefact’leriyle eşleşmeli
