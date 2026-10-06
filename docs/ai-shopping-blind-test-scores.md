# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **318/636** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **477/636**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (212 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 212 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /636.

| Model | Tarih | Konum | Incognito | Skor /636 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /636 | |
| Gemini | | | | /636 | |
| Perplexity | | | | /636 | |
| Bing Copilot | | | | /636 | |
| **Ortalama** | | | | **/636** | Hedef ≥ 318 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /636 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /636 | | |
| Gemini | | /636 | | |
| Perplexity | | /636 | | |
| Bing Copilot | | /636 | | |
| **Ortalama** | | **/636** | | Hedef ≥ 477 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
