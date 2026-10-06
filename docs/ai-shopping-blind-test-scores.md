# AI alışveriş — kör test skor kartı (sahip doldurur)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **156/312** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **234/312**  
Kaynak prompt’lar: `scripts/lib/ai-shopping-prompts.mjs` (104 prompt)

## Tur 1 — deploy sonrası (PR #55 merge + CF Pages)

Koşullar: incognito · TR konum tercih · aynı 104 prompt · yanıtta URL/atıf not et.

Skor: prompt başına **0–3** (bkz. protokol). Toplam /312.

| Model | Tarih | Konum | Incognito | Skor /312 | Not |
|-------|-------|-------|-----------|-----------|-----|
| ChatGPT | | TR / | evet | /312 | |
| Gemini | | | | /312 | |
| Perplexity | | | | /312 | |
| Bing Copilot | | | | /312 | |
| **Ortalama** | | | | **/312** | Hedef ≥ 156 |

## Tur 2 — Point C sonrası (≤2026-11-04)

| Model | Tarih | Skor /312 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|-----------|---------------------------|-----|
| ChatGPT | | /312 | | |
| Gemini | | /312 | | |
| Perplexity | | /312 | | |
| Bing Copilot | | /312 | | |
| **Ortalama** | | **/312** | | Hedef ≥ 234 |

## Prompt bazlı ham notlar (opsiyonel)

Prompt # | Model | Skor | Atıf URL | Fail nedeni
---|---|---|---|---
| | | | | |
