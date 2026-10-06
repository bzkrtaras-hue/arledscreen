# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **95/189** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **142/189**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (63 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 63 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /189.

| Model | Tarih | Konum | Incognito | Skor /189 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /189 | |
| Gemini | | | | /189 | |
| Perplexity | | | | /189 | |
| Bing Copilot | | | | /189 | |
| **Ortalama** | | | | **/189** | Hedef ≥ 95 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /189 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /189 | | |
| Gemini | | /189 | | |
| Perplexity | | /189 | | |
| Bing Copilot | | /189 | | |
| **Ortalama** | | **/189** | | Hedef ≥ 142 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
