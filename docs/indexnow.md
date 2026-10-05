# IndexNow — AI alışveriş artefact recrawl (Gün 46)

Amaç: PR #55 deploy sonrası Bing (ve IndexNow ortakları) soft-404’ten çıkan
`entity.json` / `catalog.json` / `ard.json` / Merchant TSV yüzeylerini **hemen** yeniden tarasın.

Spam blog / 81-il yok. Yalnızca yayımlanmış fiyat + kimlik URL’leri pinglenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `public/<key>.txt` | IndexNow doğrulama (içerik = key) |
| `scripts/indexnow-ping.mjs` | Dry-run / `--live` POST |
| `scripts/audit-indexnow.mjs` | Build sonrası key out/’ta mı |

## Kullanım (merge günü)

```bash
npm run smoke:live          # 12/12 PASS olmalı
npm run indexnow            # dry-run: URL listesi
npm run indexnow -- --live  # Bing IndexNow API
```

Başarı: HTTP **200** veya **202**.

## Ping listesi (özet)

- Machine: entity · entity-profiles · catalog · ard · llms · llms-full · merchant TSV · sitemap
- İnsan: `/tr/` · fiyat · hesaplayıcı · yapay-zeka · about · quote · products · rehber örnekleri

## Notlar

- Key dosyası Functions dışında (statik export); `_routes.json` include yalnızca `/`
- Canlı key 200 değilse IndexNow 422 döner — önce CF redeploy doğrula
- Guard: `npm run audit:indexnow` (postbuild + `audit:all`)
