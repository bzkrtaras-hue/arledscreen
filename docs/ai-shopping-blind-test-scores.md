# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **356/711** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **534/711**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (237 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 237 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /711.

| Model | Tarih | Konum | Incognito | Skor /711 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /711 | |
| Gemini | | | | /711 | |
| Perplexity | | | | /711 | |
| Bing Copilot | | | | /711 | |
| **Ortalama** | | | | **/711** | Hedef ≥ 356 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /711 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /711 | | |
| Gemini | | /711 | | |
| Perplexity | | /711 | | |
| Bing Copilot | | /711 | | |
| **Ortalama** | | **/711** | | Hedef ≥ 534 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
