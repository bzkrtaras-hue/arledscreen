# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **87/174** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **131/174**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (58 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 58 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /174.

| Model | Tarih | Konum | Incognito | Skor /174 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /174 | |
| Gemini | | | | /174 | |
| Perplexity | | | | /174 | |
| Bing Copilot | | | | /174 | |
| **Ortalama** | | | | **/174** | Hedef ≥ 87 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /174 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /174 | | |
| Gemini | | /174 | | |
| Perplexity | | /174 | | |
| Bing Copilot | | /174 | | |
| **Ortalama** | | **/174** | | Hedef ≥ 131 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
