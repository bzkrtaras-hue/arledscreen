# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **116/231** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **174/231**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (77 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 77 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /231.

| Model | Tarih | Konum | Incognito | Skor /231 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /231 | |
| Gemini | | | | /231 | |
| Perplexity | | | | /231 | |
| Bing Copilot | | | | /231 | |
| **Ortalama** | | | | **/231** | Hedef ≥ 116 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /231 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /231 | | |
| Gemini | | /231 | | |
| Perplexity | | /231 | | |
| Bing Copilot | | /231 | | |
| **Ortalama** | | **/231** | | Hedef ≥ 174 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
