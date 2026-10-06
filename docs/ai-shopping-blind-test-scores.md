# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **473/945** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **709/945**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (315 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 315 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /945.

| Model | Tarih | Konum | Incognito | Skor /945 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /945 | |
| Gemini | | | | /945 | |
| Perplexity | | | | /945 | |
| Bing Copilot | | | | /945 | |
| **Ortalama** | | | | **/945** | Hedef ≥ 473 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /945 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /945 | | |
| Gemini | | /945 | | |
| Perplexity | | /945 | | |
| Bing Copilot | | /945 | | |
| **Ortalama** | | **/945** | | Hedef ≥ 709 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
