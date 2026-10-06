# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **186/372** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **279/372**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (124 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 124 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /372.

| Model | Tarih | Konum | Incognito | Skor /372 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /372 | |
| Gemini | | | | /372 | |
| Perplexity | | | | /372 | |
| Bing Copilot | | | | /372 | |
| **Ortalama** | | | | **/372** | Hedef ≥ 186 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /372 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /372 | | |
| Gemini | | /372 | | |
| Perplexity | | /372 | | |
| Bing Copilot | | /372 | | |
| **Ortalama** | | **/372** | | Hedef ≥ 279 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
