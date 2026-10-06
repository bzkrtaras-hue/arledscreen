# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **452/903** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **678/903**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (301 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 301 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /903.

| Model | Tarih | Konum | Incognito | Skor /903 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /903 | |
| Gemini | | | | /903 | |
| Perplexity | | | | /903 | |
| Bing Copilot | | | | /903 | |
| **Ortalama** | | | | **/903** | Hedef ≥ 452 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /903 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /903 | | |
| Gemini | | /903 | | |
| Perplexity | | /903 | | |
| Bing Copilot | | /903 | | |
| **Ortalama** | | **/903** | | Hedef ≥ 678 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
