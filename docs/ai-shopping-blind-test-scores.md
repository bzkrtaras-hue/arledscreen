# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **72/144** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **108/144**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (48 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 48 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /144.

| Model | Tarih | Konum | Incognito | Skor /144 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /144 | |
| Gemini | | | | /144 | |
| Perplexity | | | | /144 | |
| Bing Copilot | | | | /144 | |
| **Ortalama** | | | | **/144** | Hedef ≥ 72 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /144 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /144 | | |
| Gemini | | /144 | | |
| Perplexity | | /144 | | |
| Bing Copilot | | /144 | | |
| **Ortalama** | | **/144** | | Hedef ≥ 108 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
