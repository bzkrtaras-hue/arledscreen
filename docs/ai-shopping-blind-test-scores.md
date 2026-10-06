# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **77/153** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **115/153**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (51 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 51 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /153.

| Model | Tarih | Konum | Incognito | Skor /153 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /153 | |
| Gemini | | | | /153 | |
| Perplexity | | | | /153 | |
| Bing Copilot | | | | /153 | |
| **Ortalama** | | | | **/153** | Hedef ≥ 77 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /153 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /153 | | |
| Gemini | | /153 | | |
| Perplexity | | /153 | | |
| Bing Copilot | | /153 | | |
| **Ortalama** | | **/153** | | Hedef ≥ 115 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
