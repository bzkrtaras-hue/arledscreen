# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **495/990** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **743/990**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (330 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 330 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /990.

| Model | Tarih | Konum | Incognito | Skor /990 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /990 | |
| Gemini | | | | /990 | |
| Perplexity | | | | /990 | |
| Bing Copilot | | | | /990 | |
| **Ortalama** | | | | **/990** | Hedef ≥ 495 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /990 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /990 | | |
| Gemini | | /990 | | |
| Perplexity | | /990 | | |
| Bing Copilot | | /990 | | |
| **Ortalama** | | **/990** | | Hedef ≥ 743 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
