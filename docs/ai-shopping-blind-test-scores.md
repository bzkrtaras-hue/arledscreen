# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **365/729** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **547/729**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (243 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 243 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /729.

| Model | Tarih | Konum | Incognito | Skor /729 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /729 | |
| Gemini | | | | /729 | |
| Perplexity | | | | /729 | |
| Bing Copilot | | | | /729 | |
| **Ortalama** | | | | **/729** | Hedef ≥ 365 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /729 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /729 | | |
| Gemini | | /729 | | |
| Perplexity | | /729 | | |
| Bing Copilot | | /729 | | |
| **Ortalama** | | **/729** | | Hedef ≥ 547 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
