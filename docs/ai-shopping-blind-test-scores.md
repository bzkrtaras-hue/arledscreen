# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **162/324** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **243/324**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (108 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 108 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /324.

| Model | Tarih | Konum | Incognito | Skor /324 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /324 | |
| Gemini | | | | /324 | |
| Perplexity | | | | /324 | |
| Bing Copilot | | | | /324 | |
| **Ortalama** | | | | **/324** | Hedef ≥ 162 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /324 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /324 | | |
| Gemini | | /324 | | |
| Perplexity | | /324 | | |
| Bing Copilot | | /324 | | |
| **Ortalama** | | **/324** | | Hedef ≥ 243 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
