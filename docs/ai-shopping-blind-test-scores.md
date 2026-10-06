# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **209/417** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **313/417**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (139 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 139 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /417.

| Model | Tarih | Konum | Incognito | Skor /417 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /417 | |
| Gemini | | | | /417 | |
| Perplexity | | | | /417 | |
| Bing Copilot | | | | /417 | |
| **Ortalama** | | | | **/417** | Hedef ≥ 209 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /417 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /417 | | |
| Gemini | | /417 | | |
| Perplexity | | /417 | | |
| Bing Copilot | | /417 | | |
| **Ortalama** | | **/417** | | Hedef ≥ 313 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
