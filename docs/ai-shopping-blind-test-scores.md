# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **117/234** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **176/234**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (78 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 78 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /234.

| Model | Tarih | Konum | Incognito | Skor /234 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /234 | |
| Gemini | | | | /234 | |
| Perplexity | | | | /234 | |
| Bing Copilot | | | | /234 | |
| **Ortalama** | | | | **/234** | Hedef ≥ 117 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /234 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /234 | | |
| Gemini | | /234 | | |
| Perplexity | | /234 | | |
| Bing Copilot | | /234 | | |
| **Ortalama** | | **/234** | | Hedef ≥ 176 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
