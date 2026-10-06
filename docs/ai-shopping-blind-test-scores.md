# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **257/513** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **385/513**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (171 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 171 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /513.

| Model | Tarih | Konum | Incognito | Skor /513 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /513 | |
| Gemini | | | | /513 | |
| Perplexity | | | | /513 | |
| Bing Copilot | | | | /513 | |
| **Ortalama** | | | | **/513** | Hedef ≥ 257 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /513 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /513 | | |
| Gemini | | /513 | | |
| Perplexity | | /513 | | |
| Bing Copilot | | /513 | | |
| **Ortalama** | | **/513** | | Hedef ≥ 385 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
