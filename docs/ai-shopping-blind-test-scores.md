# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **281/561** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **421/561**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (187 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 187 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /561.

| Model | Tarih | Konum | Incognito | Skor /561 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /561 | |
| Gemini | | | | /561 | |
| Perplexity | | | | /561 | |
| Bing Copilot | | | | /561 | |
| **Ortalama** | | | | **/561** | Hedef ≥ 281 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /561 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /561 | | |
| Gemini | | /561 | | |
| Perplexity | | /561 | | |
| Bing Copilot | | /561 | | |
| **Ortalama** | | **/561** | | Hedef ≥ 421 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
