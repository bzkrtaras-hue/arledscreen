# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **113/225** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **169/225**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (75 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 75 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /225.

| Model | Tarih | Konum | Incognito | Skor /225 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /225 | |
| Gemini | | | | /225 | |
| Perplexity | | | | /225 | |
| Bing Copilot | | | | /225 | |
| **Ortalama** | | | | **/225** | Hedef ≥ 113 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /225 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /225 | | |
| Gemini | | /225 | | |
| Perplexity | | /225 | | |
| Bing Copilot | | /225 | | |
| **Ortalama** | | **/225** | | Hedef ≥ 169 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
