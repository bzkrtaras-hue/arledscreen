# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **476/951** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **714/951**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (317 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 317 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /951.

| Model | Tarih | Konum | Incognito | Skor /951 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /951 | |
| Gemini | | | | /951 | |
| Perplexity | | | | /951 | |
| Bing Copilot | | | | /951 | |
| **Ortalama** | | | | **/951** | Hedef ≥ 476 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /951 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /951 | | |
| Gemini | | /951 | | |
| Perplexity | | /951 | | |
| Bing Copilot | | /951 | | |
| **Ortalama** | | **/951** | | Hedef ≥ 714 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
