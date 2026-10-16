import test from "node:test";
import assert from "node:assert/strict";
import * as G from "../../functions/api/_melis-guards.js";

test("normTr folds Turkish capitals", () => {
  assert.equal(G.normTr("İNSAN MISIN"), "insan misin");
  assert.equal(G.normTr("Kimle konuşuyorum"), "kimle konusuyorum");
});
test("replaceSentences / dropSentences keep paragraphs", () => {
  assert.equal(G.dropSentences("A. B. C.", (x) => x === "B."), "A. C.");
  assert.equal(G.dropSentences("A.", () => true), null);
  assert.deepEqual(G.replaceSentences("A. B. B.", (x) => x === "B.", "X."), { text: "A. X.", changed: true });
});
test("splitSent does not split at address abbreviations", () => {
  assert.deepEqual(G.splitSent("Adres Merkez Mah. Tuna Sok. No:15-17 Kat 1. Teşekkürler."), ["Adres Merkez Mah. Tuna Sok. No:15-17 Kat 1.", "Teşekkürler."]);
});
test("starProducts", () => {
  assert.deepEqual(G.starProducts("${7*7} bu"), [49]);
  assert.deepEqual(G.starProducts("4x3 m"), []);
  assert.equal(G.sanitizeUserText("${7*7} bu ekranın fiyatı ne?"), "bu ekranın fiyatı ne?");
});
test("quality list", () => {
  for (const w of ["kaliteli", "Yüksek kalite", "yüksek kaliteli", "güvenilirlik", "güvenilir", "high quality", "high-quality", "reliable", "reliability"]) assert.ok(G.QUALITY_RE.test(w), w);
  for (const w of ["görüntü kalitesi için piksel aralığı", "garanti", "kalıp"]) assert.ok(!G.QUALITY_RE.test(w), w);
});
