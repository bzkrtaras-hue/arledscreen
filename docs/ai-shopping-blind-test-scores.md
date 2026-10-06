# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **438/876** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **657/876**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (292 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 292 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /876.

| Model | Tarih | Konum | Incognito | Skor /876 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /876 | |
| Gemini | | | | /876 | |
| Perplexity | | | | /876 | |
| Bing Copilot | | | | /876 | |
| **Ortalama** | | | | **/876** | Hedef ≥ 438 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /876 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /876 | | |
| Gemini | | /876 | | |
| Perplexity | | /876 | | |
| Bing Copilot | | /876 | | |
| **Ortalama** | | **/876** | | Hedef ≥ 657 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
