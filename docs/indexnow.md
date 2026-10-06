# IndexNow — değişmiş URL bildirimi

Amaç: Katalogdaki **içeriği değişmiş** ve canlıda **HTTP 200** dönen URL’leri Bing/IndexNow ortaklarına **bir kez** bildirmek.

Spam blog / 81-il yok. IndexNow **indeks, AI anılması veya P0 kapısını açmaz** — yalnızca bildirim kapısıdır (HTTP 200/202).

**Merge kapısı:** PR #55 `main`’e birleşip Cloudflare production’a çıkmadan canlı URL değişmez. Dal içi invent/sync commit’leri (`verify:premerge` GREEN dahil) canlı gövdeyi değiştirmez → IndexNow’a gönderilecek “değişmiş canlı URL” yoktur. `entity.json` / `ai-shopping.json` / `ard.json` hâlâ canlı 404 iken ping işe yaramaz.

## Kurallar (sahip)

1. Yalnızca `scripts/lib/indexnow-urls.mjs` kataloğundaki URL’ler
2. Canlı GET **200** değilse atlama (ping yok)
3. Değişim = yerel `out/` (yoksa `public/`) artefact SHA-256; önceki hash ile aynıysa atlama
4. Aynı URL **aynı UTC günü** tekrar gönderilmez
5. POST cevabı **200** veya **202** → bildirim kapısı geçti
6. **403 / 422 / 429** → `docs/indexnow-sahip-listesi.md` satırına yaz, **dur**; yeni sayfa yazma
7. İlk görülen URL: hash baseline kaydı (POST yok) — sonraki artefact değişiminde bir kez POST

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `public/<key>.txt` | IndexNow doğrulama (içerik = key) |
| `scripts/lib/indexnow-urls.mjs` | URL kataloğu (tek kaynak) |
| `scripts/indexnow-ping.mjs` | Dry-run / `--live` / `--baseline` |
| `.cache/indexnow-state.json` | Hash + lastSentDate (git dışı) |
| `docs/indexnow-sahip-listesi.md` | 403/422/429 sahip hataları |
| `scripts/audit-indexnow.mjs` | Key + katalog ↔ `out/` artefact |

## POST şekli

```http
POST https://api.indexnow.org/indexnow
Content-Type: application/json; charset=utf-8
```

```json
{
  "host": "arledscreen.com",
  "key": "ANAHTAR",
  "keyLocation": "https://arledscreen.com/ANAHTAR.txt",
  "urlList": [
    "https://arledscreen.com/tr/led-ekran-fiyatlari/"
  ]
}
```

Script her değişmiş URL için **tek elemanlı** `urlList` ile POST atar (hata URL’si net olsun).

## Kullanım

```bash
npm run smoke:live                 # canlı yüzeyler
npm run indexnow                   # dry-run: aday URL’ler
npm run indexnow -- --baseline     # yalnızca hash baseline (POST yok)
npm run indexnow -- --live         # değişmiş live-200 URL’leri bir kez bildir
npm run indexnow -- --live --url=https://arledscreen.com/tr/led-ekran-fiyatlari/
```

`--url=` yalnızca katalogda olan adresi zorlar; yine live-200 + aynı-gün koruması geçerlidir.

## Merge günü

```bash
npm run post-deploy                # smoke → indexnow --live
# veya IndexNow’suz:
npm run post-deploy -- --no-indexnow
```

## Notlar

- Key dosyası Functions dışında (statik export); `_routes.json` include yalnızca `/`
- Canlı key 200 değilse API çoğu zaman **422** döner → sahip listesine yazılır, dur
- Guard: `npm run audit:indexnow` — katalog `out/` artefact’leriyle eşleşmeli
- P0 (canlı entity/catalog/ard + Point C + kör tur) IndexNow’dan **bağımsız** sahip işidir
