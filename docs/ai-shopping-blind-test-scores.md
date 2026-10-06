# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **488/975** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **732/975**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (325 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 325 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /975.

| Model | Tarih | Konum | Incognito | Skor /975 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /975 | |
| Gemini | | | | /975 | |
| Perplexity | | | | /975 | |
| Bing Copilot | | | | /975 | |
| **Ortalama** | | | | **/975** | Hedef ≥ 488 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /975 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /975 | | |
| Gemini | | /975 | | |
| Perplexity | | /975 | | |
| Bing Copilot | | /975 | | |
| **Ortalama** | | **/975** | | Hedef ≥ 732 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
