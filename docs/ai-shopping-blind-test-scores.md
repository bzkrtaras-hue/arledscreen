# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **414/828** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **621/828**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (276 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 276 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /828.

| Model | Tarih | Konum | Incognito | Skor /828 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /828 | |
| Gemini | | | | /828 | |
| Perplexity | | | | /828 | |
| Bing Copilot | | | | /828 | |
| **Ortalama** | | | | **/828** | Hedef ≥ 414 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /828 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /828 | | |
| Gemini | | /828 | | |
| Perplexity | | /828 | | |
| Bing Copilot | | /828 | | |
| **Ortalama** | | **/828** | | Hedef ≥ 621 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
