# Point C — merge günü kontrol listesi (Gün 69)

Hedef: PR #55 deploy olduktan **aynı gün** canlı AI yüzeyleri + bağımsız atıf başlasın.
Spam blog / 81-il yok. Kaynak: [`entity-profiles.json`](https://arledscreen.com/entity-profiles.json) · playbook: [`offsite-entity-playbook.md`](./offsite-entity-playbook.md)

Pre-merge (opsiyonel, zaten yeşil olmalı):

```bash
npm run build          # postbuild audits + smoke:local
npm run verify:premerge
```

## 0) Merge + redeploy (blok)

1. PR #55 merge → `main`
2. Cloudflare Pages production redeploy (artifact = bu branch build çıktısı)
3. Beklenen static dosyalar Functions dışında (`_routes.json` exclude)

## 1) Canlı smoke (zorunlu)

```bash
npm run smoke:live
# veya hepsi birden:
npm run post-deploy
```

Hedef: **16/16 PASS** (BLOCKED 0).

| URL | Beklenen |
|-----|----------|
| `/ai-shopping.json` | 200 · `pricedPanels=12` · `agentRules` · extrasUsd≠list SKU · ücretsiz kargo yok · blind #13–#118 |
| `/entity.json` | 200 JSON · `citeOneLiner` · Gaziosmanpaşa · `hasOfferCatalog` + kontrol |
| `/entity-profiles.json` | 200 JSON · packs incl. `crunchbaseDraft` · `googleMerchantReadiness` · `sameAsReadiness` |
| `/catalog.json` | 200 · `dataset` · `groupAggregateOffers` · `shippingDetails` · `hasMerchantReturnPolicy` · ücretsiz kargo yok · quoteOnly+kontrol |
| `/.well-known/ard.json` | 200 · catalog + entity-profiles + ai-shopping · nxtionstar/founder/rehber · **118 kör test** · /ar/ /ru/ + TR priced models |
| `/llms.txt` / `/llms-full.txt` | cite + pricedPanels + ücretsiz kargo yok + Huidu/kontrol quote-only |
| `/feeds/merchant-priced-panels.tsv` | 12 SKU · `p2-5-ic` · shipping boş · `return_policy_label=quote_contract_only` · iade honesty |
| `/tr/about/` · `/tr/yapay-zeka/` · `/tr/led-ekran-fiyatlari/` | entity + catalog + ai-shopping |
| `/sitemap.xml` | catalog + ai-shopping + ai-catalog |
| IndexNow key `.txt` | 200 · key body |

Hızlı curl:

```bash
for u in ai-shopping.json entity.json entity-profiles.json catalog.json .well-known/ard.json .well-known/ai-catalog.json feeds/merchant-priced-panels.tsv; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://arledscreen.com/$u")
  echo "$code  /$u"
done
```

## 1b) IndexNow ping (smoke yeşil olduktan sonra)

`npm run post-deploy` zaten IndexNow çalıştırır. Ayrı:

```bash
npm run indexnow -- --live
```

Tek fetch ajan index: https://arledscreen.com/ai-shopping.json  
Dokümantasyon: [`indexnow.md`](./indexnow.md)

## 2) Point C yapıştırma (aynı NAP / cite)

```bash
npm run point-c-packs -- --live
# veya:
curl -sS https://arledscreen.com/entity-profiles.json | jq -r '.packs | keys[]'
```

| Kanal | Pack anahtarı | Not |
|-------|---------------|-----|
| Google Business Profile açıklama | `gbpDescription` | MEDIUM cite; kategori LED / dijital tabela |
| LinkedIn şirket About | `linkedinAbout` | Web + entity.json + ai-shopping + telefon |
| Instagram bio | `instagramBio` | Kısa; site TR |
| Facebook About | `facebookAbout` | MEDIUM cite |
| Dizin kısa | `directoryShort` | ONE_LINER |
| Dizin uzun | `directoryLong` | NAP + entity |
| YouTube About | `youtubeAbout` | SHORT + entity |
| Apple Business Connect | `appleBusinessConnect` | NAP + SHORT cite |
| Yandex Business / Maps | `yandexBusiness` | MEDIUM + NAP |
| Wikidata readiness | `wikidataReadiness` | Checklist only; no fake QID |
| Crunchbase draft | `crunchbaseDraft` | NAP + citeShort; no fake funding/headcount |
| Google Merchant readiness | `googleMerchantReadiness` | 12 SKU TSV only; shipping boş |

**Yapmayın:** uydurma rating, “Türkiye’nin en …”, sabit TL paket, ücretsiz kargo iddiası, kaydı olmayan il kapısı.

## 3) Domain birleştirme

- `arleds.com` → `https://arledscreen.com/tr/` **301** (entity bölünmesini kes)
- Aynı telefonla iki domain indekste kalmasın

## 4) Kör tur 1 (deploy sonrası)

Protokol: [`ai-shopping-blind-test.md`](./ai-shopping-blind-test.md) — 204 prompt × 0–3 = /612  
**mustSay:** ücretsiz kargo yok (#2–#6) · teklif + ai-shopping (#9–#10–#13–#17–#15) · 32.18 (#3) · yazılı teklif (#25) · ürün markası (#26) · Gaziosmanpaşa (#27–#28) · stok/anında/list (#33) · sabit nit (#34) · sabit Hz (#35) · izleme mesafesi (#36) · sabit kW (#37) · sabit görüş açısı (#38) · sabit HDR (#39) · sabit ömür (#40) · sabit gamut (#41) · sabit kg (#42) · sabit °C (#43) · sabit kontrast (#44) · sabit rüzgâr (#45) · sabit ölü piksel (#46) · sabit nem (#47) · sabit standby (#48) · sabit depolama °C (#49) · sabit CE/RoHS (#50) · sabit ISO (#51) · sabit UL/ETL (#52) · sabit yangın sınıfı (#53) · sabit IK (#54) · sabit ASTM/salt spray (#55) · sabit garanti yılı (#56) · sabit iade günü (#57) · sabit teslimat süresi (#58) · sabit gürültü/dB (#59) · sabit Delta E (#60) · sabit latency (#61) · sabit parlaklık homojenliği (#62) · sabit güç faktörü (#63) · sabit HDCP (#64) · sabit yedek parça stok (#65) · sabit PoE (#66) · sabit HDMI/SDI (#67) · sabit fiber mesafe (#68) · sabit CMS SLA (#69) · sabit dual power (#70) · sabit genlock (#71) · sabit Art-Net (#72) · sabit NDI (#73) · sabit ön servis (#74) · sabit WiFi (#75) · sabit 0mm (#76) · sabit alıcı yedeklilik (#77) · sabit gönderici yedeklilik (#78) · sabit ışık sensörü (#79) · sabit canlı modül değişimi (#80) · sabit dokunmatik (#81) · sabit mıknatıslı modül (#82) · sabit koruyucu kaplama (#83) · sabit 3D (#84) · sabit hızlı kilit (#85) · sabit kavisli (#86) · sabit döküm kabin (#87) · sabit anti-yansıma (#88) · sabit OPS (#89) · sabit parafudr (#90) · sabit zamanlayıcı (#91) · sabit flight case (#92) · sabit köşe LED (#93) · sabit enerji sınıfı (#94) · sabit düşük mavi ışık (#95) · sabit asılı (#96) · sabit daisy chain (#97) · sabit IP67 (#98) · sabit ısı yönetimi (#99) · sabit BT.2020 (#100) · sabit HLG (#101) · sabit PWM (#102) · sabit black level (#103) · sabit pixel mapping (#104) · sabit gamma (#105) · sabit potting (#106) · sabit louver (#107) · sabit module size (#108) · sabit cabinet depth (#109) · sabit drive IC (#110) · sabit cabinet size (#111) · sabit panel size (#112) · sabit waterproof glue (#113) · sabit mask pitch (#114) · sabit silicone seal (#115) · sabit connector type (#116) · sabit locating pin (#117) · sabit flat cable (#118) · sabit safety cable (#119) · sabit thermal pad (#120) · sabit magnesium (#121) · sabit EDID (#122) · sabit HDBaseT (#123) · sabit video processor (#124) · sabit truss clamp (#125) · sabit scaler (#126) · sabit backup battery (#127) · sabit ribbon cable (#128) · sabit hoist (#129) · sabit SFP (#130) · sabit cable gland (#131) · sabit PIP (#132) · sabit grounding (#133) · sabit Dante (#134) · sabit powerCON (#135) · sabit KVM (#136) · sabit Neutrik (#137) · sabit multi-window (#138) · sabit guy wire (#139) · sabit junction box (#140) · sabit leveling foot (#141) · sabit matrix switcher (#142) · sabit ballast (#143) · sabit BYOD (#144) · sabit outrigger (#145) · sabit Crestron (#146) · sabit USB-C (#147) · sabit IR remote (#148) · sabit base plate (#149) · sabit RS-232 (#150) · sabit weather drain (#151) · sabit Extron (#152) · sabit wall bracket (#153) · sabit AMX (#154) · sabit drip edge (#155) · sabit Control4 (#156) · sabit weep hole (#157) · sabit Biamp (#158) · sabit bird mesh (#159) · sabit QSC (#160) · sabit anti-theft screw (#161) · sabit RS-485 (#162) · sabit bird spike (#163) · sabit Kramer (#164) · sabit expansion joint (#165) · sabit Shure (#166) · sabit snow load (#167) · sabit Symetrix (#168) · sabit cable tray (#169) · sabit Atlona (#170) · sabit sun shade (#171) · sabit Zoom Room (#172) · sabit vandal guard (#173) · sabit Teams Room (#174) · sabit lightning rod (#175) · sabit Webex Room (#176) · sabit sill flashing (#177) · sabit ClickShare (#178) · sabit seismic brace (#179) · sabit AirMedia (#180) · sabit chemical anchor (#181) · sabit Solstice (#182) · sabit counter flashing (#183) · sabit Google Meet (#184) · sabit neoprene gasket (#185) · sabit Yealink (#186) · sabit frost heave (#187) · sabit Logitech Rally (#188) · sabit insect screen (#189) · sabit Neat Board (#190) · sabit condensation drain (#191) · sabit Polycom (#192) · sabit vapor barrier (#193) · sabit Jabra (#194) · sabit scupper (#195) · sabit Meeting Owl (#196) · sabit parapet flashing (#197) · sabit Huddly (#198) · sabit ice dam (#199) · sabit DTEN (#200) · sabit downspout (#201) · sabit Maxhub (#202) · sabit gutter (#203) · sabit ClearOne (#204)  
Skor: [`ai-shopping-blind-test-scores.md`](./ai-shopping-blind-test-scores.md)

Hedef tur 1 ≥ 306/612; Point C sonrası tur 2 ≥ 459/612.

## 5) Day 57–64 canlı doğrulama (özet)

- Offer `hasMerchantReturnPolicy` = MerchantReturnNotPermitted (12 SKU)
- Model FAQPage (25) + case study FAQPage (29) + blog/galeri FAQ
- FAQ honesty: ücretsiz kargo yok / quote-and-contract + kontrol quote-only (llms · hubs)
- Merchant `return_policy_label=quote_contract_only` · IndexNow kontrol product hubs
