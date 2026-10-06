# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **125/249** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **187/249**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (83 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 83 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /249.

| Model | Tarih | Konum | Incognito | Skor /249 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /249 | |
| Gemini | | | | /249 | |
| Perplexity | | | | /249 | |
| Bing Copilot | | | | /249 | |
| **Ortalama** | | | | **/249** | Hedef ≥ 125 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /249 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /249 | | |
| Gemini | | /249 | | |
| Perplexity | | /249 | | |
| Bing Copilot | | /249 | | |
| **Ortalama** | | **/249** | | Hedef ≥ 187 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
