// Test harness for functions/api/chat.js: runs onRequest with a stubbed Gemini (global fetch) and a unique client IP per call.
import { onRequest } from "../../functions/api/chat.js";

let n = 0;
export const JPEG_B64 = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]).toString("base64");

// replies: string | (system, contents, isPhoto) => string. Photo analysis requests get `photoJson` (object).
export async function chat(messages, { reply = "Tamam.", photoJson = null, image = false, lang } = {}) {
  const calls = [];
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    const payload = JSON.parse(init.body);
    const system = payload.systemInstruction.parts[0].text;
    const isPhoto = payload.contents.some((c) => c.parts.some((p) => p.inlineData));
    calls.push({ system, contents: payload.contents, isPhoto });
    const text = isPhoto ? JSON.stringify(photoJson) : typeof reply === "function" ? reply(system, payload.contents, calls.length) : reply;
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text }] } }] }), { status: 200, headers: { "content-type": "application/json" } });
  };
  try {
    const body = { messages: messages.map((m) => (typeof m === "string" ? { role: "user", text: m } : m)) };
    if (image) body.image = { mime: "image/jpeg", data: JPEG_B64 };
    const req = new Request("https://melis.test/api/chat", { method: "POST", headers: { "content-type": "application/json", "cf-connecting-ip": `10.0.${Math.floor(++n / 250)}.${n % 250}` }, body: JSON.stringify(body) });
    const res = await onRequest({ request: req, env: { GEMINI_API_KEY: "test-key" } });
    return { status: res.status, ...(await res.json()), calls };
  } finally { globalThis.fetch = realFetch; }
}
