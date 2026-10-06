# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **146/291** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **219/291**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (97 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 97 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /291.

| Model | Tarih | Konum | Incognito | Skor /291 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /291 | |
| Gemini | | | | /291 | |
| Perplexity | | | | /291 | |
| Bing Copilot | | | | /291 | |
| **Ortalama** | | | | **/291** | Hedef ≥ 146 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /291 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /291 | | |
| Gemini | | /291 | | |
| Perplexity | | /291 | | |
| Bing Copilot | | /291 | | |
| **Ortalama** | | **/291** | | Hedef ≥ 219 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
