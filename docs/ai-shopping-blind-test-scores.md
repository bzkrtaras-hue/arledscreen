# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **284/567** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **426/567**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (189 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 189 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /567.

| Model | Tarih | Konum | Incognito | Skor /567 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /567 | |
| Gemini | | | | /567 | |
| Perplexity | | | | /567 | |
| Bing Copilot | | | | /567 | |
| **Ortalama** | | | | **/567** | Hedef ≥ 284 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /567 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /567 | | |
| Gemini | | /567 | | |
| Perplexity | | /567 | | |
| Bing Copilot | | /567 | | |
| **Ortalama** | | **/567** | | Hedef ≥ 426 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
