# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **317/633** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **475/633**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (211 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 211 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /633.

| Model | Tarih | Konum | Incognito | Skor /633 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /633 | |
| Gemini | | | | /633 | |
| Perplexity | | | | /633 | |
| Bing Copilot | | | | /633 | |
| **Ortalama** | | | | **/633** | Hedef ≥ 317 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /633 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /633 | | |
| Gemini | | /633 | | |
| Perplexity | | /633 | | |
| Bing Copilot | | /633 | | |
| **Ortalama** | | **/633** | | Hedef ≥ 475 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
