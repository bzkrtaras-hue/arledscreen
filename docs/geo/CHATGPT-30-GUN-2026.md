# ChatGPT görünürlüğü — 30 gün (12 Ekim – 11 Kasım 2026)

Amaç: ChatGPT aramasında ARLEDSCREEN’in doğru firma olarak, kanonik URL ile anılabilmesi. “ChatGPT’de 1. sıradayız” hedefi yok. Atıf garantisi yok; ay sonunda yazılan şey yalnızca gözlemdir.

## ChatGPT neye bakıyor

OpenAI’nin yayımladığı kural: özet ve kaynakta çıkmak için `OAI-SearchBot` engellenmemeli. Ayrı bir ChatGPT kayıt formu yok. `robots.txt` değişince sistem yaklaşık 24 saat sonra uyar.

Bu sitede canlı kural duruyor: `User-Agent: OAI-SearchBot` ve `User-Agent: ChatGPT-User` için `Allow: /` (`functions/robots.txt.js`). `GPTBot` eğitim tarayıcısıdır; arama atıfı için onun açılması yetmez, o da zaten açık.

ChatGPT, sayfayı kendi tarayıcısıyla veya bir arama sağlayıcısı üzerinden bulur. Bing Webmaster’a sitemap göndermek “ChatGPT’ye gönder” değildir; sağlayıcı yolunu açık tutar. Yönlendirme adreslerinde `utm_source=chatgpt.com` gelir. Sitede ayrı bir analitik kodu yok; bu ay eklenmez.

Atıfı kesen iki ölçülmüş boşluk kodda bitmez:

- Aynı telefonla `arleds.com` hâlâ indekste. Kanonik site `https://arledscreen.com/tr/`.
- Üçüncü taraf kayıtlarda NAP (ad, adres, telefon) seyrek. ChatGPT tek kaynağa kilitlenince firmayı Alman ARLED, NEXTSTAR TV veya NationStar ile karıştırabiliyor.

## Haftalık tempo

Her gün tek blok. Yeni ince sayfa, ana sayfa yerleşimi, Melis metni ve günlük production yayını yok. Production, en fazla hafta 3’te bir kez.

### Hafta 1 — 12–18 Ekim: taban

Yeni sohbet açın. Arama açık olsun. Soruya marka adı eklemeyin (`k-*` seti). Cevaptaki kaynak URL’lerini olduğu gibi yazın.

| Gün | İş |
|---|---|
| 12 Eki | `k-1` … `k-4` |
| 13 Eki | `k-5` … `k-8` |
| 14 Eki | `k-9` … `k-12` |
| 15 Eki | Tur1a, yalnız ChatGPT: prompt `1` … `6` |
| 16 Eki | Tur1a, yalnız ChatGPT: prompt `7` … `12` |
| 17 Eki | Cloudflare’de Bot Fight veya WAF’ın `OAI-SearchBot` isteğini 403 yapmadığını kontrol edin. IP listesi değişir; kopya yazmayın: https://developers.openai.com/api/docs/bots ve https://openai.com/searchbot.json |
| 18 Eki | Bing Webmaster’da `arledscreen.com` doğrulayın. `sitemap.xml` ve `sitemap-ai.xml` gönderin. Search Console’da aynı iki sitemap duruyor mu bakın. |

Kategori soruları ve beklenen sayfa: `docs/geo/blind-test-prompts.md` içindeki `k-1` … `k-12`.

Kayıt (yüzde yok):

```bash
node scripts/geo-blind-log.mjs --platform=chatgpt --promptId=k-1 --locale=tr-TR \
  --mentioned=no --brandCorrect=yes --priceSourceCited=none \
  --sources=https://arledscreen.com/tr/rehber/led-ekran/ \
  --notes="hafta1 taban"
```

`mentioned`: cevapta ARLEDSCREEN veya `arledscreen.com` varsa `yes`, sadece tanım varsa `partial`, hiç yoksa `no`.
`brandCorrect`: Alman ARLED, NEXTSTAR TV veya NationStar ile karışmadıysa `yes`.

`k-*` soruları Tur1a matrisine girmez; yukarıdaki `geo-blind-log` komutuyla yazılır. Tur1a hücresini (`1` … `12`) sıradaki boş hücre olarak `npm run tur1a:next` gösterir. Doğrudan ChatGPT hücresi:

```bash
npm run tur1a:log -- --platform=chatgpt --promptId=6 \
  --mentioned=yes --brandCorrect=yes --priceSourceCited=ai-shopping \
  --sources=https://arledscreen.com/ai-shopping.json \
  --notes="hafta1 taban; beklenen P1.25 GOB 95.88 USD"
```

Gözlem dosyası `docs/geo/observations/blind-log.jsonl`. Yüzde üretmeyin. `npm run tur1a:summary` yalnız sayar.

### Hafta 2 — 19–25 Ekim: tek firma

ChatGPT’nin “kim?” sorusunda iki domaine bölünmemesi için. Yapıştırma metni `docs/offsite-entity-playbook.md` §0. Canlı sıra: https://arledscreen.com/owner-next.html?start=1

| Gün | İş | Bitti sayılması |
|---|---|---|
| 19 Eki | `arleds.com` → `https://arledscreen.com/tr/` kalıcı 301. Panel: https://www.isimtescil.net/ | `npm run verify:arleds-301` çıkış kodu 0 |
| 20 Eki | Google Business Profile: ad ARLEDSCREEN, adres Kat 1 / 34245, telefon +90 530 507 88 34, web `https://arledscreen.com/tr/`, açıklama `citeMedium` | Profildeki NAP siteyle aynı |
| 21 Eki | Bing Places: aynı NAP. https://www.bingplaces.com/ | Aynı adres satırı |
| 22 Eki | LinkedIn şirket hakkında: `citeMedium` + kanonik site. https://www.linkedin.com/company/arleds | Biyoda `arleds.com` yok |
| 23 Eki | Instagram @arledscreen ve Facebook @arledscreenn biyosu: kanonik site + telefon | Web alanı `arledscreen.com` |
| 24 Eki | Bir TR işletme dizini (tek domain, satın alınmış link ağı değil). Metin kısa cite | Dizin URL’si not edildi |
| 25 Eki | Hafta 1 notlarında `brandCorrect=no` olan soruları ayırın. Düzeltme yalnızca sitede zaten yazan olguysa sıradaki yayına girer | Liste boş veya dolu, uydurma cümle yok |

### Hafta 3 — 26 Ekim – 1 Kasım: bir yayın

| Gün | İş |
|---|---|
| 26 Eki | Önizleme dalındaki GEO düzeltmesi (kesik `llms.txt` / `entity.ts` ve Huidu–NovaStar–Colorlight SSS) canlıya alınacaksa bu gün tek production yayını. IndexNow, yayın betiği başarılı olursa kendisi gider. |
| 27–28 Eki | Yayından 24 saat sonra `k-12` ve Tur1a `6` birer kez daha. Yeni sayfa açmayın. |
| 29 Eki | Hafta 1’de kaynak URL’si yanlış olan kategori sorusu varsa, o sayfanın ilk paragrafı veya mevcut SSS’i yayımlanmış olguyla netleştirilir. Fiyat, sertifika, nit, IP, kW eklenmez. |
| 30 Eki | İkinci dizin veya bir kısa video. Açıklamada tek kanonik URL. Video şart değil. |
| 31 Eki – 1 Kas | Yayın yok. Cloudflare ve Bing’de hafta 1 maddeleri hâlâ açıksa onları kapatın. |

### Hafta 4 — 2–11 Kasım: aynı sorular

Aynı metin, aynı ayar, yeni sohbet.

| Gün | İş |
|---|---|
| 2–4 Kas | `k-1` … `k-12`, not: `hafta4` |
| 5–6 Kas | Tur1a ChatGPT `1` … `12`, not: `hafta4` |
| 7 Kas | İki turu yan yana okuyun: `mentioned`, `brandCorrect`, `sources` içinde `arledscreen.com` var mı, fiyat sorusunda 95.88 ve `priceValidUntil` 2026-12-31 duruyor mu |
| 8–9 Kas | Yalnız tekrarlayan yanlış iddia varsa (Alman firma, NationStar, TL fiyat, `arleds.com` kaynak) bir cümlelik düzeltme notu. Yeni iddia yazmayın. |
| 10–11 Kas | Kapanış. Aşağıdaki kontrol listesi işaretlenir. Skor veya yüzde yazılmaz. |

Kayıtları saymak:

```bash
node scripts/geo-blind-log.mjs --summary
```

## Ay sonu kontrolü

İşaret, gözlem veya panel ekranı ile konur. Tahminle konmaz.

- [ ] `OAI-SearchBot` 403 almıyor
- [ ] `arleds.com` 301 doğrulaması çıkış 0
- [ ] Google Business Profile ve Bing Places NAP siteyle aynı
- [ ] LinkedIn / Instagram / Facebook web alanı `arledscreen.com`
- [ ] `k-1` … `k-12` iki kez kayıtlı (`hafta1` ve `hafta4`)
- [ ] Tur1a ChatGPT `1` … `12` iki kez kayıtlı
- [ ] Marka sorularında (Tur1a 3, 4, 7, 10) karıştırma varsa `wrongClaims` dolu
- [ ] P1.25 sorusunda kaynak `arledscreen.com` ise fiyat 95.88 USD; değilse `priceSourceCited=none` veya `other`

## Bu ay yapılmayanlar

- Anılma yüzdesi, “kaçıncı sıradayız”, rakip ismi uydurmak
- Ana sayfa renk ve yerleşim, Melis metni, fiyat dosyaları
- Her güne bir production yayını
- “Distribütör” ve tedarikçi site adı
- Wikidata maddesi zorlamak (doğrulanamayan alan açmayın)
- Satın alınmış link veya aynı metni onlarca kopya sitede çoğaltmak
