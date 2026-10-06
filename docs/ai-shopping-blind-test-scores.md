# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **254/507** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **381/507**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (169 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 169 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /507.

| Model | Tarih | Konum | Incognito | Skor /507 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /507 | |
| Gemini | | | | /507 | |
| Perplexity | | | | /507 | |
| Bing Copilot | | | | /507 | |
| **Ortalama** | | | | **/507** | Hedef ≥ 254 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /507 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /507 | | |
| Gemini | | /507 | | |
| Perplexity | | /507 | | |
| Bing Copilot | | /507 | | |
| **Ortalama** | | **/507** | | Hedef ≥ 381 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
