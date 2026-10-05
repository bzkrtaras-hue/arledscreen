# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **41/81** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **61/81**  
Spam blog / 81-il yok. Kaynaklar: `entity.json` · `catalog.json` · `entity-profiles.json` · `ard.json`

## Site readiness (repo)

| Kontrol | Durum |
|---------|--------|
| `npm run audit:blind-test` | build/postbuild |
| `npm run smoke:live` | deploy sonrası 20/20 |

## Tur kayıtları

Skor: prompt başına **0–3** (bkz. protokol). Toplam /81.

### Tur 1 — deploy sonrası (PR #55 canlı)

| Model | Tarih | Konum | Incognito | Skor /81 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /81 | |
| Gemini | | | | /81 | |
| Perplexity | | | | /81 | |
| Bing Copilot | | | | /81 | |
| **Ortalama** | | | | **/81** | Hedef ≥ 41 |

### Tur 2 — Point C sonrası (≤ 2026-11-04)

| Model | Tarih | Skor /81 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /81 | | |
| Gemini | | /81 | | |
| Perplexity | | /81 | | |
| Bing Copilot | | /81 | | |
| **Ortalama** | | **/81** | | Hedef ≥ 61 |
