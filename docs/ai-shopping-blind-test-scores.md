# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **491/981** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **736/981**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (327 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 327 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /981.

| Model | Tarih | Konum | Incognito | Skor /981 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /981 | |
| Gemini | | | | /981 | |
| Perplexity | | | | /981 | |
| Bing Copilot | | | | /981 | |
| **Ortalama** | | | | **/981** | Hedef ≥ 491 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /981 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /981 | | |
| Gemini | | /981 | | |
| Perplexity | | /981 | | |
| Bing Copilot | | /981 | | |
| **Ortalama** | | **/981** | | Hedef ≥ 736 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
