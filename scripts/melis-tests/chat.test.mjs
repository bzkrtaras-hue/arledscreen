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
