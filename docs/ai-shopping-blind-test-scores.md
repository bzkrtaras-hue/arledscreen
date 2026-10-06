# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **110/219** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **165/219**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (73 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 73 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /219.

| Model | Tarih | Konum | Incognito | Skor /219 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /219 | |
| Gemini | | | | /219 | |
| Perplexity | | | | /219 | |
| Bing Copilot | | | | /219 | |
| **Ortalama** | | | | **/219** | Hedef ≥ 110 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /219 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /219 | | |
| Gemini | | /219 | | |
| Perplexity | | /219 | | |
| Bing Copilot | | /219 | | |
| **Ortalama** | | **/219** | | Hedef ≥ 165 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
