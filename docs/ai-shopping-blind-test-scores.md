# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **278/555** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **417/555**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (185 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 185 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /555.

| Model | Tarih | Konum | Incognito | Skor /555 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /555 | |
| Gemini | | | | /555 | |
| Perplexity | | | | /555 | |
| Bing Copilot | | | | /555 | |
| **Ortalama** | | | | **/555** | Hedef ≥ 278 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /555 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /555 | | |
| Gemini | | /555 | | |
| Perplexity | | /555 | | |
| Bing Copilot | | /555 | | |
| **Ortalama** | | **/555** | | Hedef ≥ 417 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
