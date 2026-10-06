# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **111/222** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **167/222**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (74 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 74 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /222.

| Model | Tarih | Konum | Incognito | Skor /222 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /222 | |
| Gemini | | | | /222 | |
| Perplexity | | | | /222 | |
| Bing Copilot | | | | /222 | |
| **Ortalama** | | | | **/222** | Hedef ≥ 111 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /222 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /222 | | |
| Gemini | | /222 | | |
| Perplexity | | /222 | | |
| Bing Copilot | | /222 | | |
| **Ortalama** | | **/222** | | Hedef ≥ 167 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
