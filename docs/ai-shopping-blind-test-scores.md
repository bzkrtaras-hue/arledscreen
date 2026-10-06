# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **161/321** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **241/321**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (107 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 107 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /321.

| Model | Tarih | Konum | Incognito | Skor /321 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /321 | |
| Gemini | | | | /321 | |
| Perplexity | | | | /321 | |
| Bing Copilot | | | | /321 | |
| **Ortalama** | | | | **/321** | Hedef ≥ 161 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /321 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /321 | | |
| Gemini | | /321 | | |
| Perplexity | | /321 | | |
| Bing Copilot | | /321 | | |
| **Ortalama** | | **/321** | | Hedef ≥ 241 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
