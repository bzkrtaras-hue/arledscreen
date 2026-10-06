# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **332/663** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **498/663**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (221 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 221 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /663.

| Model | Tarih | Konum | Incognito | Skor /663 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /663 | |
| Gemini | | | | /663 | |
| Perplexity | | | | /663 | |
| Bing Copilot | | | | /663 | |
| **Ortalama** | | | | **/663** | Hedef ≥ 332 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /663 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /663 | | |
| Gemini | | /663 | | |
| Perplexity | | /663 | | |
| Bing Copilot | | /663 | | |
| **Ortalama** | | **/663** | | Hedef ≥ 498 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
