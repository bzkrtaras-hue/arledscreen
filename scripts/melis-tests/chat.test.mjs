// Regression tests for the Melis fixes (PREVIEW_REPORT 16 Oct 2026). Run: npm run melis:test
import test from "node:test";
import assert from "node:assert/strict";
import { chat } from "./helpers.mjs";
import * as G from "../../functions/api/_melis-guards.js";

const BANNED_ID = /dijital\s+(?:temsilci|asistan)|digital\s+(?:representative|assistant)/i;
const PHONE = /530\s*507\s*88\s*34/;

// (1) introduction ---------------------------------------------------------------------------------
test("(1) intro questions → fixed answer without AI mention, no model call", async () => {
  for (const q of ["Kendini tanıtır mısın?", "Kimle konuşuyorum?", "Adın ne, ne iş yapıyorsun?", "Sen kimsin?", "KENDİNİ TANITIR MISIN", "Adınız nedir?", "Who are you?", "What's your name?", "Introduce yourself", "Who am I talking to?"]) {
    const r = await chat([q], { reply: "model must not be called" });
    assert.equal(r.guard, "intro", q);
    assert.equal(r.calls.length, 0, q);
    assert.match(r.reply, /^(Ben Melis, ARLEDSCREEN satış danışmanıyım\.|I'm Melis, ARLEDSCREEN's sales consultant\.)/, q);
    // answer language follows the question (short Turkish questions such as "Sen kimsin?" carry no marker words)
    assert.equal(/^Ben Melis/.test(r.reply), !/^(?:who|what|introduce)/i.test(q.replace(/^[^a-z]*/i, "")) || /kimsin|tanıt|konuş|ad[ıi]n|ADINIZ/i.test(q) && !/^(?:who|what|introduce)/i.test(q), q);
    assert.doesNotMatch(r.reply, /yapay|(?<![\p{L}])AI(?![\p{L}])|artificial|bot\b/iu, q);
    assert.doesNotMatch(r.reply, BANNED_ID, q);
  }
});
test("(1) a model answer that spontaneously says AI is cleaned (not an identity question)", async () => {
  const r = await chat(["LED ekran modül ömrü nedir?"], { reply: "Ben yapay zekâ destekli ARLEDSCREEN satış danışmanıyım. Süre teklifte netleşir. Ekranınızı iç mekâna mı düşünüyorsunuz?" });
  assert.doesNotMatch(r.reply, /yapay/i);
});

// (2) identity guard ---------------------------------------------------------------------------------
test("(2) bot/human questions incl. capital İ, caps and ASCII spellings → approved honest answer + WhatsApp", async () => {
  const qs = ["İnsan mısın?", "İNSAN MISIN", "insan misin", "Insan misin?", "Sen insan mısın?", "Bot musun?", "BOT MUSUN?", "Robot musun", "Yapay zeka mısın?", "Yapay Zekâ mısın?", "YAPAY ZEKA MISIN", "Gerçek biri misin yoksa robot mu?", "Gerçek insan mısınız?", "Canlı biri misin?", "Are you a bot?", "ARE YOU HUMAN?", "Is this a real person?", "Am I talking to a bot?", "Are you an AI?"];
  for (const q of qs) {
    const r = await chat([q], { reply: "model must not be called" });
    assert.equal(r.guard, "identity", q);
    assert.equal(r.calls.length, 0, q);
    assert.equal(r.wa, true, q);
    assert.match(r.reply, /yapay zekâ destekli|AI-supported/, q);
    assert.match(r.reply, /WhatsApp/, q);
    assert.doesNotMatch(r.reply, BANNED_ID, q);
    assert.doesNotMatch(r.reply, /(?:ben|I am|I'm)\s+(?:bir\s+)?(?:gerçek\s+)?(?:insanım|human|a person|real)/i, q);
  }
});
test("(1)(2) language of the fixed answers follows the question", async () => {
  for (const [q, tr] of [["Sen kimsin?", true], ["Kimsiniz?", true], ["Who are you?", false], ["What is your name?", false], ["Bot musun?", true], ["Are you a bot?", false], ["INSAN MISIN", true]]) {
    const r = await chat([q]);
    assert.equal(/Ben Melis|Bakış açınıza/.test(r.reply), tr, q + " → " + r.reply);
  }
});
test("(2) normal sentences are not mistaken for identity questions", () => {
  for (const q of ["İnsanlar için ekran yüksekliği ne olmalı?", "5x3 m ekran fiyatı", "Botanik park için LED ekran istiyorum", "Kimsiniz diye sormuyorum, fiyat nedir?"]) assert.equal(G.isIdentityQ(q), false, q);
});

// (3) warranty ----------------------------------------------------------------------------------------
test("(3) warranty sentence is exact, server-side", async () => {
  const variants = [
    "Evet, 2 yıl garanti ile 5 yıl ücretsiz teknik servis desteğimiz var. Ekranınız iç mekân mı?",
    "Garantimiz 3 yıldır. Ekran ölçünüz nedir?",
    "Ürünlerimiz garantilidir. Ekran ölçünüz nedir?",
    "5 yıl ücretsiz teknik servis güvencemiz vardır. Ekranınız nerede olacak?",
  ];
  for (const v of variants) {
    const r = await chat(["Garanti süresi nedir?"], { reply: v });
    assert.ok(r.reply.startsWith("ARLEDSCREEN 2 yıl garanti ve 5 yıl ücretsiz teknik servis sunar."), v + " → " + r.reply);
    assert.doesNotMatch(r.reply, /3 yıl/);
    assert.equal(r.reply.split("2 yıl garanti ve 5 yıl ücretsiz teknik servis").length, 2, "exactly once");
  }
  const en = await chat(["What warranty do you offer?"], { reply: "We give a 2 year warranty and five years service. Is the screen indoor?" });
  assert.match(en.reply, /ARLEDSCREEN offers a 2-year warranty and 5 years of free technical service\./);
});
test("(3) other price answers that mention the warranty are normalised to the exact wording", async () => {
  const r = await chat(["Toplu alırsam fiyat konusunda bir şey yapar mısınız?"], { reply: "Özel fiyatlandırmayı yazılı teklifle sunarız. Montaj ve 2 yıl garanti ile 5 yıl ücretsiz teknik servis desteğimiz vardır. Ekran ölçünüz nedir?" });
  assert.match(r.reply, /2 yıl garanti ve 5 yıl ücretsiz teknik servis/);
  assert.doesNotMatch(r.reply, /garanti ile/);
});

// (4) sentence trimmer ----------------------------------------------------------------------------
test("(4) trimmer keeps the whole address (Mah./Sok./No:)", () => {
  const t = "Our office is located at Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul. We are open on weekdays from 09:00. Saturday from 10:00. Sunday we are closed. Would you like to know more?";
  const out = G.trimSentences(t, 3);
  assert.ok(out.includes("Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul."), out);
  assert.ok(out.endsWith("Would you like to know more?"));
  const tr = G.trimSentences("Adresimiz Merkez Mah. Tuna Sok. No:15-17 Kat 1, Gaziosmanpaşa/İstanbul. Hafta içi 09:00. Cumartesi 10:00. Pazar kapalı. Başka sorunuz var mı?", 3);
  assert.ok(tr.includes("Tuna Sok. No:15-17 Kat 1, Gaziosmanpaşa/İstanbul."), tr);
  // regular trimming still works
  assert.equal(G.trimSentences("Bir. İki. Üç. Dört. Beş.", 4), "Bir. İki. Üç. Dört.");
});
test("(4) 'Where are you located?' answer stays whole through the full pipeline", async () => {
  const reply = "Our office is located at Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul. We are open on weekdays from 09:00 to 18:00. Saturday is 10:00 to 15:00. Would you like to know more about our installation services?";
  const r = await chat(["Where are you located?"], { reply });
  assert.match(r.reply, /Merkez Mah\. Tuna Sok\. No:15-17 Kat 1, 34245 Gaziosmanpaşa\/İstanbul/);
  // model dropped half the address → deterministic whole address
  const bad = await chat(["Where are you located?"], { reply: "Our office is located at Merkez Mah. Tuna Sok. Would you like to know more?" });
  assert.equal(bad.guard, "address");
  assert.match(bad.reply, /Merkez Mah\. Tuna Sok\. No:15-17 Kat 1, 34245 Gaziosmanpaşa\/İstanbul/);
  const tr = await chat(["Adresiniz nedir?"], { reply: "Merkez Mah. Tuna Sok. Başka bir sorunuz var mı?" });
  assert.match(tr.reply, /No:15-17 Kat 1, 34245 Gaziosmanpaşa\/İstanbul/);
  // address without the postal code / different spelling from the model → exact approved address
  const loose = await chat(["Where are you located?"], { reply: "Our office is located at Merkez Mah. Tuna Sok. No:15-17 Kat 1, Gaziosmanpaşa, Istanbul, Türkiye. Would you like directions?" });
  assert.match(loose.reply, /Merkez Mah\. Tuna Sok\. No:15-17 Kat 1, 34245 Gaziosmanpaşa\/İstanbul/);
});

// (5) forbidden praise -------------------------------------------------------------------------------
test("(5) kaliteli / yüksek kalite / güvenilirlik (and EN) never reach the customer", async () => {
  const cases = [
    ["Fiyatı biraz kırmanız lazım.", "Kaliteli modül yapımız ve montaj hizmetimizle çalışıyoruz. Özel fiyatlandırma yazılı teklifte netleşir. Ekran ölçünüz nedir?"],
    ["Ne kadar pahalısınız ya", "Yüksek kaliteli NXTIONSTAR modülleri sunuyoruz. Fiyatı yazılı teklifle veririz. Ekran ölçünüz nedir?"],
    ["Hangi marka LED ekran en iyisi?", "NXTIONSTAR ekranlar yüksek görüntü kalitesi ve güvenilirliği ile öne çıkar. Piksel aralığı kullanım alanına bağlıdır. Ekranınız iç mekân mı?"],
    ["Is your product good?", "Our screens are reliable and of high quality. Pixel pitch depends on the viewing distance. Is the screen indoor?"],
    ["Is it good?", "We offer high-quality modules. Reliability is our focus. Is the screen indoor or outdoor?"],
  ];
  for (const [q, a] of cases) {
    const r = await chat([q], { reply: a });
    assert.doesNotMatch(r.reply, /kaliteli|yüksek\s+(?:görüntü\s+)?kalite|güvenilir|high[\s-]?quality|reliab/i, q + " → " + r.reply);
    assert.ok(r.reply.length > 10 && !r.fallback, q + " → " + r.reply);
  }
  assert.match(G.QUALITY_RE.source, /kaliteli/);
});
test("(5) existing tone list still works (ucuz / indirim / kampanya)", async () => {
  const r = await chat(["Ucuz bir ekran var mı?"], { reply: "İndirim yapmıyoruz, kampanya yok. Özel fiyatlandırma yazılı teklifle verilir. Ekran ölçünüz nedir?" });
  assert.doesNotMatch(r.reply, /ucuz|indirim|kampanya/i);
});

// (6) rental --------------------------------------------------------------------------------------------
test("(6) rental: no 'İzmir dahil Türkiye geneli', no 'kurulum/nakliye ayrı'", async () => {
  const a = await chat(["Kiralık ekranı İzmir’de de kurar mısınız?"], { reply: "Evet, İzmir dahil Türkiye genelinde kiralık LED ekran hizmeti sunuyoruz. Fiyat yazılı teklifle verilir. Etkinlik tarihiniz nedir?" });
  assert.doesNotMatch(a.reply, /İzmir|Türkiye gene/i);
  assert.match(a.reply, /yazılı teklifte netleşir/);
  const b = await chat(["Kurulum ve nakliye kira bedeline dahil mi?"], { reply: "Kiralık LED ekran hizmetimizde kurulum ve nakliye bedelleri kiralama ücretinden ayrı olarak hesaplanır. Yazılı teklif hazırlayabiliriz. Etkinlik tarihiniz nedir?" });
  assert.doesNotMatch(b.reply, /ayrı olarak|ayrı/i);
  assert.match(b.reply, /yazılı teklifte netleşir/);
  const c = await chat(["Do you rent LED screens in Izmir?"], { reply: "Yes, we rent LED screens across Turkey including Izmir. Installation and transport are charged separately. What is your event date?" });
  assert.doesNotMatch(c.reply, /Izmir|across Turkey|separately/i);
  assert.match(c.reply, /clarified in the written quote/);
});
test("(6) rental: approved facts are kept, no invented prices", async () => {
  const r = await chat(["Kiralama ile satın alma farkı nedir?"], { reply: "Kiralama sahne, fuar ve etkinlik gibi geçici ihtiyaçlar içindir. Kiralık fiyat yazılı teklifle verilir. Satın almada ekran size aittir. Hangisini düşünüyorsunuz?" });
  assert.match(r.reply, /Kiralama sahne, fuar ve etkinlik/);
  assert.match(r.reply, /yazılı teklif/);
  // a sale answer about service area is untouched
  const s = await chat(["Hangi şehirlerde kurulum yapıyorsunuz?"], { reply: "Merkezimiz İstanbul'da, hizmetimiz Türkiye geneli. Ekranınız hangi şehirde olacak?" });
  assert.match(s.reply, /Türkiye geneli/);
});

test("(6) rental answers always keep 'yazılı teklif' even when the model wrote 5 sentences without it", async () => {
  const r = await chat(["Kiralama ile satın alma farkı nedir?"], { reply: "Kiralama kısa süreli ihtiyaçlar içindir. Satın alma kalıcı kullanım içindir. Kiralamada keşif ve teknik ekip desteği sunulur. Satın almada ekran size aittir. Etkinlik tarihiniz nedir?" });
  assert.match(r.reply, /yazılı teklifle verilir/);
  assert.ok(r.reply.endsWith("Etkinlik tarihiniz nedir?"));
  assert.ok(G.splitSent(r.reply).length <= 4, r.reply);
  const en = await chat(["Can I rent a screen for a weekend?"], { reply: "Yes, rental is possible for events. We can plan stage and fair setups. Please share your dates. What size do you need?" });
  assert.match(en.reply, /written quote/);
});

// (7) phone only on request -------------------------------------------------------------------------------
test("(7) phone number only when asked", async () => {
  const unasked = await chat(["Başka marka kartım var, servis verir misiniz?"], { reply: "Marka ve model bilgilerinizi paylaşırsanız değerlendiririz. Detaylar için +90 530 507 88 34 numaralı telefondan bize ulaşabilirsiniz. Kartınızın modeli nedir?" });
  assert.doesNotMatch(unasked.reply, PHONE);
  assert.match(unasked.reply, /Kartınızın modeli/);
  const asked = await chat(["Telefon numaranız nedir?"], { reply: "Bize +90 530 507 88 34 numarasından ulaşabilirsiniz." });
  assert.match(asked.reply, PHONE);
  const contact = await chat(["How can I contact you?"], { reply: "You can reach us at +90 530 507 88 34 or arled@arledscreen.com." });
  assert.match(contact.reply, PHONE);
});

// (8) size parser ----------------------------------------------------------------------------------------------
test("(8) '*' expressions are not sizes; real WxH still parsed", async () => {
  const hint = (r) => r.calls[0].system;
  const inj = await chat(["${7*7} bu ekranın fiyatı ne?"], { reply: "49 m² bir LED ekran için fiyat piksel aralığına bağlıdır. Ekran ölçünüz nedir?" });
  assert.doesNotMatch(inj.reply, /49/);
  assert.doesNotMatch(JSON.stringify(inj.calls[0].contents), /7\*7/);
  assert.doesNotMatch(hint(inj), /PRE-CHECKED FACT/);
  for (const q of ["7*7 m ekran kontrol kartı?", "4*3 m ekran için kontrol kartı?"]) {
    const r = await chat([q], { reply: "Ekran ölçünüz için kontrol sistemi öneririz. Ölçüyü genişlik × yükseklik yazar mısınız?" });
    assert.doesNotMatch(hint(r), /PRE-CHECKED FACT/, q);
  }
  const star = await chat(["7*7 ekran fiyatı"], { reply: "49 m² ekran için fiyat piksel aralığına bağlıdır. Ölçüyü genişlik × yükseklik yazar mısınız?" });
  assert.doesNotMatch(star.reply, /49/);
  for (const [q, area] of [["4x3 m ekran kontrol kartı?", "12"], ["4×3 m ekran kontrol kartı?", "12"], ["4 x 3 m ekran kontrol kartı?", "12"], ["5x3,8 metre ekran kontrol kartı?", "19"]]) {
    const r = await chat([q], { reply: "Huidu öneririz. Ekranınız iç mekân mı?" });
    assert.match(hint(r), new RegExp("screen area is " + area), q);
  }
});

// (9) photo threshold ---------------------------------------------------------------------------------------------
const OK = { usable: true, scene: "outdoor", place: "mağaza cephesi", width_m: 4, height_m: 2, viewing_distance_m: 8, confidence: "medium" };
test("(9) incidental people do not block the analysis; prominent faces and personal data still do", async () => {
  const q = [{ role: "user", text: "Buraya ekran yapılır mı?" }];
  const incidental = await chat(q, { image: true, photoJson: { ...OK, face_prominent: false, id_or_personal_data: false }, reply: "Fotoğrafa göre yaklaşık 8 m² alan var. Ekran dış mekân için P4 olabilir. Ekranı hangi mesafeden izleyecekler?" });
  assert.equal(incidental.photo, "analysed");
  const face = await chat(q, { image: true, photoJson: { ...OK, face_prominent: true, id_or_personal_data: false } });
  assert.equal(face.photo, "refused");
  const id = await chat(q, { image: true, photoJson: { ...OK, face_prominent: false, id_or_personal_data: true } });
  assert.equal(id.photo, "refused");
  const unsure = await chat(q, { image: true, photoJson: { ...OK } });
  assert.equal(unsure.photo, "refused");
  const unusable = await chat(q, { image: true, photoJson: { ...OK, usable: false, face_prominent: false, id_or_personal_data: false } });
  assert.equal(unusable.photo, "unclear");
  const sys = incidental.calls.find((c) => c.isPhoto).system;
  assert.match(sys, /face_prominent/);
  assert.match(sys, /TV \/ LED screen \/ poster/);
});

// normal product questions are untouched -----------------------------------------------------------------------------
test("normal product answers pass through unchanged (no over-trimming, no false positives)", async () => {
  const cases = [
    ["P2.5 iç mekân panel fiyatı kaç?", "P2.5 iç mekân panelimizin liste fiyatı modül başına 32,18 USD'dir. Fiyat KDV ve nakliye hariçtir. Ekranınızın ölçüsü nedir?"],
    ["15 m² ekran için hangi kontrol kartı?", "15 m² için genellikle Huidu kontrol sistemini öneriyoruz. Nihai model yazılı teklifte netleşir. Ekran iç mekân mı, dış mekân mı?"],
    ["Teslim ne kadar sürer?", "Teslimat 3–21 gün hazırlık ve 1–14 gün nakliye sürer. Tarih yazılı teklifte yer alır. Hangi şehirde kurulum düşünüyorsunuz?"],
    ["Hangi ödeme yöntemleri var?", "TL, USD ve EUR ile ödeme yapılabilir. Taksit planı yazılı teklifte belirtilir. Projenizin ölçüsü nedir?"],
    ["CE belgeniz var mı?", "Evet, ürünlerimiz CE sertifikalıdır. Belgeyi teklifle paylaşabiliriz. Ekranı nerede kullanacaksınız?"],
  ];
  for (const [q, a] of cases) {
    const r = await chat([q], { reply: a });
    assert.equal(r.reply, a, q);
  }
});

// ===== Retest round (RETEST_REPORT 16 Oct 2026, head b9df4b38) ======================================================
const ADDR = "Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul";

// R1: "dijital asistan / temsilci mısın" → same honest bot/human answer, never the forbidden phrase, no model call
test("(R1) 'dijital asistan / dijital temsilci mısın' (TR/EN, İ, caps, ASCII) → fixed honest answer, no model", async () => {
  const qs = ["Sen dijital asistan mısın?", "Dijital temsilci misiniz?", "Dijital asistan mısın?", "Dijital temsilci misin?", "DİJİTAL ASİSTAN MISIN", "dijital asistan misin", "Dijital asistan mısınız", "Dijital temsilci mı bu?", "Are you a digital assistant?", "Are you a digital representative?", "ARE YOU A DIGITAL ASSISTANT?", "Is this a digital assistant?", "Asistan mısın?"];
  for (const q of qs) {
    const r = await chat([q], { reply: "model must not be called" });
    assert.equal(r.guard, "identity", q);
    assert.equal(r.calls.length, 0, q);
    assert.equal(r.wa, true, q);
    assert.match(r.reply, /yapay zekâ destekli ARLEDSCREEN satış danışmanıyım|AI-supported ARLEDSCREEN sales consultant/, q);
    assert.match(r.reply, /WhatsApp/, q);
    assert.doesNotMatch(r.reply, BANNED_ID, q);
    assert.doesNotMatch(r.reply, /insanım|I am (?:a )?human|I'm (?:a )?human/i, q);
    assert.equal(/Bakış açınıza/.test(r.reply), !/^(?:are|is)\b/i.test(q), q); // language follows the question
  }
});

// R2: address / office / showroom / visit / appointment
test("(R2) nerede / ofis / showroom / ziyaret / randevu questions → verified address only, no model", async () => {
  const qs = ["Showroomunuz nerede, ziyaret etmek istiyorum", "Ofisiniz nerede?", "Randevu alabilir miyim?", "Mağazanız var mı, gelebilir miyim?", "Showroom var mı?", "SHOWROOMUNUZ NEREDE", "Neredesiniz?", "Merkeziniz nerede bulunuyor", "Yanınıza gelmek istiyorum", "Adresiniz nedir?", "Where is your office?", "Can I visit your showroom?", "I'd like to make an appointment, where are you?", "Where are you located?"];
  for (const q of qs) {
    const r = await chat([q], { reply: "model must not be called" });
    assert.equal(r.guard, "address", q);
    assert.equal(r.calls.length, 0, q);
    assert.ok(r.reply.includes(ADDR), q + " → " + r.reply);
    assert.match(r.reply, /09:00–18:00/, q);
    assert.match(r.reply, /10:00–15:00/, q);
    assert.doesNotMatch(r.reply, /showroom|randevu|appointment/i, q);
    assert.equal(/^Adresimiz/.test(r.reply), !/^(?:where|can i|i'd)/i.test(q), q);
  }
});
test("(R2) questions that merely contain 'nerede' / 'ziyaret' are NOT turned into the address answer", async () => {
  for (const q of ["LED ekran nerede satılıyor?", "Ürünler nerede üretiliyor?", "Keşif ziyareti ne zaman yapılır?", "Garanti nerede geçerli?", "Kurulum nerede yapılıyor?"]) {
    const r = await chat([q], { reply: "Bu konuyu yazılı teklifte netleştiririz. Ekran ölçünüz nedir?" });
    assert.notEqual(r.guard, "address", q);
    assert.equal(r.calls.length > 0, true, q);
  }
});
test("(R2) the model may not claim a showroom or appointments", async () => {
  const r = await chat(["Firmanız hakkında bilgi verir misiniz?"], { reply: "Showroomumuzu ziyaret edebilirsiniz. Randevu için bize yazın. İstanbul merkezli LED ekran firmasıyız. Ekran ölçünüz nedir?" });
  assert.doesNotMatch(r.reply, /showroom|randevu/i, r.reply);
  assert.match(r.reply, /İstanbul merkezli/);
  // the customer's own showroom is fine to mention
  const own = await chat(["Showroomuma 3x2 m ekran istiyorum, kontrol kartı?"], { reply: "Showroomunuz için 3 × 2 m ölçüsü yaklaşık 6 m²'dir. Genellikle Huidu kontrol sistemini öneriyoruz. Ekran iç mekânda mı olacak?" });
  assert.match(own.reply, /Showroomunuz/);
});

// R3: quality / production / resolution wording
test("(R3) 'kalitemiz', 'kalitesi', 'standartlarında üretilmekte', 'yüksek çözünürlüklü', EN 'quality' / 'high-resolution' / 'manufactured' are removed", async () => {
  const cases = [
    ["Ne kadar pahalısınız ya", "Modül kalitemiz ve montaj hizmetimizle projenizi destekliyoruz. Fiyat yazılı teklifle verilir. Ekran ölçünüz nedir?"],
    ["Kaliteli mi ürünleriniz?", "Ürünlerimiz ARLEDSCREEN standartlarında üretilmekte ve CE sertifikalıdır. Teknik föy teklifle paylaşılır. Ekranı nerede kullanacaksınız?"],
    ["Hangi panelleri önerirsiniz?", "Yüksek çözünürlüklü NXTIONSTAR panelleri sunuyoruz. Piksel aralığı izleme mesafesine göre seçilir. Ekran iç mekânda mı olacak?"],
    ["Panel kalitesi nasıl?", "Panellerin kalitesi çok iyidir. CE sertifikalıdır. Ekran ölçünüz nedir?"],
    ["How good are your panels?", "Our panels offer great quality and are manufactured to strict standards. They are CE certified. Is the screen indoor?"],
    ["Do you have sharp displays?", "We offer high-resolution panels. Pixel pitch depends on the viewing distance. Is the screen indoor?"],
  ];
  for (const [q, a] of cases) {
    const r = await chat([q], { reply: a });
    assert.doesNotMatch(r.reply, /kalite|quality|standart|üretil|manufactur|çözünürlüklü|high-resolution/i, q + " → " + r.reply);
    assert.ok(r.reply.length > 20 && !r.fallback, q + " → " + r.reply);
  }
});
test("(R3) technical use of resolution / image quality is not broken", async () => {
  const ok = [
    ["Piksel aralığı neye göre seçilir?", "Küçük piksel aralığı yakın izlemede daha yüksek çözünürlük sağlar. Her 1 mm için yaklaşık 1 m minimum izleme mesafesi önerilir. Ekranı hangi mesafeden izleyeceksiniz?"],
    ["Görüntü kalitesi neye bağlı?", "Görüntü kalitesi piksel aralığı ve izleme mesafesine bağlıdır. P2.5 yakın izleme için uygundur. Ekran iç mekânda mı olacak?"],
    ["What does image quality depend on?", "Image quality depends on the pixel pitch and the viewing distance. P2.5 suits close viewing. Is the screen indoor?"],
    ["Huidu kartı kaç piksel taşır?", "Huidu HD-C16 resmi föyde yaklaşık 200.000 piksele (640×320) kadar yükleme belirtir. Ekranınız kaç m² olacak?"],
  ];
  for (const [q, a] of ok) { const r = await chat([q], { reply: a }); assert.equal(r.reply, a, q); }
});
test("(R3) when every sentence is an unverified claim the customer gets a neutral answer, not an error", async () => {
  const r = await chat(["Ürünleriniz iyi mi?"], { reply: "Modül kalitemiz çok yüksektir." });
  assert.equal(r.guard, "claim_safe");
  assert.ok(!r.fallback);
  assert.doesNotMatch(r.reply, /kalite/i);
  assert.match(r.reply, /yazılı teklif/);
});

// R4: changing the control card later is not in the KB → no yes/no
test("(R4) control card changed later → no yes/no claim, team confirms in writing + WhatsApp, no model", async () => {
  for (const q of ["Kontrol kartını sonradan değiştirebilir miyim?", "KONTROL KARTINI SONRADAN DEĞİŞTİREBİLİR MİYİM", "Sonradan NovaStar kartına geçebilir miyim?", "Kartı ileride yükseltebilir miyim?", "Can I change the control card later?"]) {
    const r = await chat([q], { reply: "Evet, sonradan değiştirilebilir." });
    assert.equal(r.guard, "card_change", q);
    assert.equal(r.calls.length, 0, q);
    assert.equal(r.wa, true, q);
    assert.doesNotMatch(r.reply, /^Evet|değiştirilebilir\b|^Yes|is possible/i, q);
    assert.match(r.reply, /yazılı olarak teyit|confirmed in writing/, q);
    assert.match(r.reply, /WhatsApp/, q);
  }
  // ordinary control-card questions still reach the model
  const n = await chat(["Kontrol kartı hangisi olmalı?"], { reply: "Ekran ölçünüze göre belirlenir. Kaç m² olacak?" });
  assert.equal(n.calls.length, 1);
});
test("(R4) knowledge base has no statement about changing the card later (so the answer stays 'team confirms')", async () => {
  const { readFileSync } = await import("node:fs");
  const kb = readFileSync(new URL("../../docs/melis-knowledge-base.md", import.meta.url), "utf8");
  assert.match(kb, /sonradan değiştirilip değiştirilemeyeceği hakkında kaynakta bilgi yoktur/);
  assert.doesNotMatch(kb, /sonradan değiştirilebilir/);
});

// minor: Huidu vs NovaStar, KB facts, customer's language
test("(minor) Huidu vs NovaStar → comparison from KB facts in the customer's language, no model", async () => {
  for (const q of ["Huidu vs NovaStar", "Huidu mu NovaStar mı?", "Huidu ile NovaStar farkı nedir", "HUIDU Mİ NOVASTAR MI"]) {
    const r = await chat([q], { reply: "model must not be called" });
    assert.equal(r.guard, "control_compare", q);
    assert.match(r.reply, /^Huidu, Wi-Fi veya USB/, q);
    assert.match(r.reply, /NovaStar ise yüksek piksel yükü, sahne ve senkron/, q);
    assert.match(r.reply, /20 m² altında Huidu, 20 m² ve üzerinde NovaStar/, q);
    assert.doesNotMatch(r.reply, /\bthe\b|\bis an\b/, q);
  }
  const en = await chat(["Which is better, Huidu or NovaStar?"], {});
  assert.equal(en.guard, "control_compare");
  assert.match(en.reply, /^Huidu is an asynchronous system/);
  // with a size or a price it is a project question → normal flow
  const proj = await chat(["15 m² için Huidu mu NovaStar mı?"], { reply: "15 m² için genellikle Huidu öneriyoruz. Ekran iç mekân mı?" });
  assert.equal(proj.calls.length, 1);
});

// ===== Retest #2 (RETEST2_REPORT, head 6f7eec6a) ==========================================================================
test("(T1) three-brand question (colorlight, any case / İ) skips the Huidu–NovaStar guard → model answers", async () => {
  for (const q of ["Huidu, NovaStar ve Colorlight arasındaki fark nedir?", "huidu novastar COLORLİGHT farkı", "Huidu mu NovaStar mı Colorlight mı?", "Colorlight ile NovaStar farkı ve Huidu"]) {
    const a = "Huidu asenkron, NovaStar yüksek piksel yükü ve senkron, Colorlight çok kaynaklı işler için kullanılır. Nihai model yazılı teklifte netleşir. Ekranınız kaç m² olacak?";
    const r = await chat([q], { reply: a });
    assert.equal(r.calls.length, 1, q);
    assert.notEqual(r.guard, "control_compare", q);
    assert.match(r.reply, /Colorlight/, q);
  }
  // the two-brand question still uses the KB comparison
  assert.equal((await chat(["Huidu mu NovaStar mı?"])).guard, "control_compare");
});
test("(T2) address guard ignores pixel / pitch / P-value / module / panel questions that mention showroom or office", async () => {
  for (const q of ["Showroom için hangi piksel aralığı?", "Showroomum için hangi P2.5 mi P3 mü?", "Ofisim için hangi P değeri uygun?", "Showroom için hangi panel?", "Which pixel pitch for my showroom?", "What P value for my office?", "Showroom için çözünürlük ne olmalı?"]) {
    const r = await chat([q], { reply: "İzleme mesafesine göre belirlenir; yakın izlemede küçük piksel aralığı seçilir. Ekran kaç m² olacak?" });
    assert.equal(r.calls.length, 1, q);
    assert.notEqual(r.guard, "address", q);
  }
  // real address questions are unchanged
  for (const q of ["Showroomunuz nerede?", "Where is your office?"]) assert.equal((await chat([q])).guard, "address", q);
});
test("(T3) address template only for Turkish/English; Russian and Arabic go to the model (language kept, only KB address)", async () => {
  const ru = await chat(["Где находится ваш офис?"], { reply: "Наш адрес: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul. Мы работаем по будням с 09:00 до 18:00. Чем ещё могу помочь?" });
  assert.equal(ru.calls.length, 1);
  assert.notEqual(ru.guard, "address");
  assert.match(ru.reply, /[\u0400-\u04FF]/);
  assert.ok(ru.reply.includes("Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul"));
  const ar = await chat(["عنوانكم أين؟"], { reply: "عنواننا: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul. ساعات العمل من الاثنين إلى الجمعة 09:00–18:00." });
  assert.equal(ar.calls.length, 1);
  assert.match(ar.reply, /[\u0600-\u06FF]/);
  assert.doesNotMatch(ar.reply, /^Adresimiz/);
  // showroom claims are filtered in Russian too
  const sh = await chat(["Где находится ваш офис?"], { reply: "Приходите в наш шоурум. Адрес: Merkez Mah. Tuna Sok. No:15-17 Kat 1, 34245 Gaziosmanpaşa/İstanbul. Чем ещё помочь?" });
  assert.doesNotMatch(sh.reply, /шоурум/i);
});
test("(a) Arabic / Russian warranty: faithful translation of the approved sentence, no model, no fallback", async () => {
  const ar = await chat(["ما هي مدة الضمان؟"], { reply: "model must not be called" });
  assert.equal(ar.guard, "warranty"); assert.equal(ar.calls.length, 0);
  assert.match(ar.reply, /[\u0600-\u06FF]/); assert.match(ar.reply, /ARLEDSCREEN/); assert.match(ar.reply, /5/); assert.match(ar.reply, /مجانية/);
  const ru = await chat(["Какая гарантия?"], {});
  assert.equal(ru.guard, "warranty"); assert.match(ru.reply, /2 года гарантии и 5 лет бесплатного технического обслуживания/);
});
test("(a) language guard: a mostly-correct Arabic answer (Latin brand/numbers, odd word) is accepted; an all-English answer to Arabic is still rejected", async () => {
  const ok = await chat(["كم يستغرق التسليم؟"], { reply: "يستغرق التحضير 3–21 يومًا والشحن 1–14 يومًا وخمة. يتم تأكيد التاريخ في عرض السعر المكتوب من ARLEDSCREEN. ما حجم الشاشة؟" });
  assert.ok(!ok.fallback, ok.reply);
  assert.match(ok.reply, /3–21/);
  const bad = await chat(["كم يستغرق التسليم؟"], { reply: "Delivery takes 3–21 days. What size do you need?" });
  assert.equal(bad.fallback, true);
});
test("(b) soft praise 'titizlikle seçilmektedir' / 'profesyonel projelerde güvenle tercih edilmektedir' is removed", async () => {
  for (const [q, a] of [["Modül kalitesi nasıl?", "Modüller titizlikle seçilmektedir. Piksel aralığı izleme mesafesine göre belirlenir. Ekran iç mekânda mı olacak?"], ["Ekranlarınız nasıl?", "NXTIONSTAR ekranlar profesyonel projelerde güvenle tercih edilmektedir. CE sertifikalıdır. Ekranı nerede kullanacaksınız?"]]) {
    const r = await chat([q], { reply: a });
    assert.doesNotMatch(r.reply, /titizlikle|güvenle tercih|kalite/i, q + " → " + r.reply);
    assert.ok(r.reply.length > 20 && !r.fallback, r.reply);
  }
});
