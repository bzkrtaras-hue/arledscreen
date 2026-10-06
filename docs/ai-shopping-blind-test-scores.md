# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **242/483** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **363/483**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (161 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 161 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /483.

| Model | Tarih | Konum | Incognito | Skor /483 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /483 | |
| Gemini | | | | /483 | |
| Perplexity | | | | /483 | |
| Bing Copilot | | | | /483 | |
| **Ortalama** | | | | **/483** | Hedef ≥ 242 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /483 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /483 | | |
| Gemini | | /483 | | |
| Perplexity | | /483 | | |
| Bing Copilot | | /483 | | |
| **Ortalama** | | **/483** | | Hedef ≥ 363 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
