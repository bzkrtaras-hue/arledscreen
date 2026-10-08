const STEPS_TR = [
  {
    title: "İhtiyaç ve ölçü",
    body: "Kullanım amacı, ortam (iç/dış), yaklaşık ölçü, konum ve zaman planını alıyoruz.",
  },
  {
    title: "Keşif ve ön proje",
    body: "İzleme mesafesi, montaj yüzeyi, elektrik ve sinyal altyapısını inceleyip piksel aralığını öneriyoruz.",
  },
  {
    title: "Teklif ve teknik föy",
    body: "Ekran ölçüsü, kabin adedi, malzeme listesi ve iş planını yazılı teklifte paylaşıyoruz.",
  },
  {
    title: "Montaj ve devreye alma",
    body: "Taşıyıcı sistem, kabin montajı, kablolama, kalibrasyon ve içerik testini tamamlıyoruz.",
  },
  {
    title: "Teknik servis",
    body: "Kullanım eğitimi sonrası bakım, arıza ve yedek parça taleplerinizde yanınızdayız.",
  },
];

const STEPS_EN = [
  {
    title: "Need and size",
    body: "We collect use case, indoor/outdoor, approx. size, location and timeline.",
  },
  {
    title: "Survey and pre-design",
    body: "We review viewing distance, mount surface, power and signal, then propose pitch.",
  },
  {
    title: "Quote and tech sheet",
    body: "Screen size, cabinet count, materials and work plan go into a written quote.",
  },
  {
    title: "Install and commissioning",
    body: "Structure, cabinets, cabling, calibration and content test.",
  },
  {
    title: "Technical service",
    body: "After handover we support maintenance, faults and spare parts.",
  },
];

export function ProcessSteps({ locale = "tr" }: { locale?: "tr" | "en" }) {
  const steps = locale === "en" ? STEPS_EN : STEPS_TR;
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {steps.map((step, i) => (
        <li key={step.title} className="relative rounded-2xl p-5 glass-card">
          <span className="font-display text-sm font-extrabold text-cyan" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-display text-base font-bold text-ink">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
