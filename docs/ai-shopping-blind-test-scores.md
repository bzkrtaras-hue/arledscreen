# AI alışveriş — kör test skor kartı

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md)  
Hedef: Tur 1 (deploy sonrası) ≥ **20/39** · Tur 2 (Point C sonrası, ≤2026-11-04) ≥ **29/39**  
Spam blog / 81-il yok. Kaynaklar: `entity.json` · `catalog.json` · `entity-profiles.json` · `ard.json`

## Site readiness (repo)

| Kontrol | Durum |
|---------|--------|
| `npm run audit:blind-test` | build/postbuild |
| `npm run smoke:live` | deploy sonrası 14/14 |

## Tur kayıtları

Skor: prompt başına **0–3** (bkz. protokol). Toplam /39.

### Tur 1 — deploy sonrası (PR #55 canlı)

| Model | Tarih | Konum | Incognito | Skor /39 | Not |
|-------|-------|-------|-----------|----------|-----|
| ChatGPT | | TR / | evet | /39 | |
| Gemini | | | | /39 | |
| Perplexity | | | | /39 | |
| Bing Copilot | | | | /39 | |
| **Ortalama** | | | | **/39** | Hedef ≥ 20 |

Detay (örnek — her model için kopyalayın):

```
Tarih:
Model:
# | Prompt | Skor | Atıf URL | Not
1 | ARLEDSCREEN kimdir? |  |  |
2 | LED ekran panel fiyatları 2026 |  |  |
3 | P2.5 iç mekan panel kaç USD? |  |  | must: 32,18
4 | Dış mekan fiyat bandı |  |  |
5 | m² maliyeti nasıl hesaplanır? |  |  |
6 | AI ajanları fiyatı nereden okur? |  |  |
7 | GOB mi SMD mi? |  |  |
8 | LED tabela mı LED ekran mı? |  |  |
9 | Kiralık LED fiyatı? |  |  | list yok → teklif
10 | Şeffaf/transparan fiyatı? |  |  | list yok → teklif
11 | İstanbul LED telefon? |  |  | +90 530 507 88 34
12 | NXTIONSTAR nedir? |  |  |
13 | Huidu / NovaStar kontrol kartı fiyatı? |  |  | list yok → teklif
Toplam: /39
```

### Tur 2 — Point C sonrası (≤ 2026-11-04)

Önkoşul: GBP + LinkedIn/IG/FB About = `entity-profiles.json` packs · `arleds.com` 301

| Model | Tarih | Skor /39 | Bağımsız atıf görüldü mü? | Not |
|-------|-------|----------|---------------------------|-----|
| ChatGPT | | /39 | | |
| Gemini | | /39 | | |
| Perplexity | | /39 | | |
| Bing Copilot | | /39 | | |
| **Ortalama** | | **/39** | | Hedef ≥ 29 |

## Point C sayaç (tur 2 ile birlikte)

| Kaynak | URL / kanıt | Aynı cite? |
|--------|-------------|------------|
| GBP | | ☐ |
| LinkedIn şirket | | ☐ |
| Instagram | | ☐ |
| Facebook | | ☐ |
| Dizin 1 | | ☐ |
| Dizin 2 | | ☐ |
