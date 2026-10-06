# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **297/594** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **446/594**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (198 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 198 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /594.

| Model | Tarih | Konum | Incognito | Skor /594 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /594 | |
| Gemini | | | | /594 | |
| Perplexity | | | | /594 | |
| Bing Copilot | | | | /594 | |
| **Ortalama** | | | | **/594** | Hedef ≥ 297 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /594 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /594 | | |
| Gemini | | /594 | | |
| Perplexity | | /594 | | |
| Bing Copilot | | /594 | | |
| **Ortalama** | | **/594** | | Hedef ≥ 446 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
