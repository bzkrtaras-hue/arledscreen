# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **453/906** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **680/906**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (302 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 302 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /906.

| Model | Tarih | Konum | Incognito | Skor /906 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /906 | |
| Gemini | | | | /906 | |
| Perplexity | | | | /906 | |
| Bing Copilot | | | | /906 | |
| **Ortalama** | | | | **/906** | Hedef ≥ 453 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /906 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /906 | | |
| Gemini | | /906 | | |
| Perplexity | | /906 | | |
| Bing Copilot | | /906 | | |
| **Ortalama** | | **/906** | | Hedef ≥ 680 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
