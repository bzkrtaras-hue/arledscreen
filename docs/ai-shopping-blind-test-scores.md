# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **305/609** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **457/609**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (203 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 203 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /609.

| Model | Tarih | Konum | Incognito | Skor /609 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /609 | |
| Gemini | | | | /609 | |
| Perplexity | | | | /609 | |
| Bing Copilot | | | | /609 | |
| **Ortalama** | | | | **/609** | Hedef ≥ 305 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /609 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /609 | | |
| Gemini | | /609 | | |
| Perplexity | | /609 | | |
| Bing Copilot | | /609 | | |
| **Ortalama** | | **/609** | | Hedef ≥ 457 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
