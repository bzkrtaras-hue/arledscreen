# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **306/612** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **459/612**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (204 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 204 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /612.

| Model | Tarih | Konum | Incognito | Skor /612 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /612 | |
| Gemini | | | | /612 | |
| Perplexity | | | | /612 | |
| Bing Copilot | | | | /612 | |
| **Ortalama** | | | | **/612** | Hedef ≥ 306 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /612 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /612 | | |
| Gemini | | /612 | | |
| Perplexity | | /612 | | |
| Bing Copilot | | /612 | | |
| **Ortalama** | | **/612** | | Hedef ≥ 459 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
