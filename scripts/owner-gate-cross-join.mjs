/**
 * Owner-gate HowTo invent cross-join helpers.
 * Keeps point-c / geo-status / geo-next / tur1a / point-c-progress Dataset walks closed.
 */
const SITE = "https://arledscreen.com";

export const OWNER_GATE_URLS = [
  `${SITE}/point-c.json`,
  `${SITE}/geo-status.json`,
  `${SITE}/geo-next.txt`,
  `${SITE}/tur1a.json`,
  `${SITE}/point-c-progress.json`,
];

export function ownerGateSameAsUrls() {
  return [...OWNER_GATE_URLS];
}

export function ownerGateSubjectOfEntries() {
  return [
    {
      "@type": "Dataset",
      "@id": `${SITE}/point-c.json`,
      url: `${SITE}/point-c.json`,
      name: "ARLEDSCREEN Point C paste packs (HowTo potentialAction)",
    },
    {
      "@type": "Dataset",
      "@id": `${SITE}/geo-status.json`,
      url: `${SITE}/geo-status.json`,
      name: "ARLEDSCREEN GEO owner-gate status (HowTo potentialAction)",
    },
    {
      "@type": "DataDownload",
      "@id": `${SITE}/geo-next.txt`,
      url: `${SITE}/geo-next.txt`,
      name: "ARLEDSCREEN GEO priority clipboard",
      encodingFormat: "text/plain",
    },
    {
      "@type": "Dataset",
      "@id": `${SITE}/tur1a.json`,
      url: `${SITE}/tur1a.json`,
      name: "ARLEDSCREEN Tur1a blind coverage (HowTo potentialAction)",
    },
    {
      "@type": "Dataset",
      "@id": `${SITE}/point-c-progress.json`,
      url: `${SITE}/point-c-progress.json`,
      name: "ARLEDSCREEN Point C paste progress (HowTo potentialAction)",
    },
  ];
}

export function ownerGateDistributionEntries() {
  return [
    {
      "@type": "DataDownload",
      encodingFormat: "application/ld+json",
      contentUrl: `${SITE}/point-c.json`,
      name: "ARLEDSCREEN Point C paste packs (HowTo potentialAction)",
    },
    {
      "@type": "DataDownload",
      encodingFormat: "application/ld+json",
      contentUrl: `${SITE}/geo-status.json`,
      name: "ARLEDSCREEN GEO owner-gate status (HowTo potentialAction)",
    },
    {
      "@type": "DataDownload",
      encodingFormat: "text/plain",
      contentUrl: `${SITE}/geo-next.txt`,
      name: "ARLEDSCREEN GEO priority clipboard",
    },
    {
      "@type": "DataDownload",
      encodingFormat: "application/ld+json",
      contentUrl: `${SITE}/tur1a.json`,
      name: "ARLEDSCREEN Tur1a blind coverage (HowTo potentialAction)",
    },
    {
      "@type": "DataDownload",
      encodingFormat: "application/ld+json",
      contentUrl: `${SITE}/point-c-progress.json`,
      name: "ARLEDSCREEN Point C paste progress (HowTo potentialAction)",
    },
  ];
}

/** Merge full owner-gate cross-join invent onto a Dataset/HowTo doc (idempotent). */
export function applyOwnerGateCrossJoin(doc) {
  if (!doc || typeof doc !== "object") return doc;

  const same = new Set(Array.isArray(doc.sameAs) ? doc.sameAs.map(String) : []);
  for (const u of OWNER_GATE_URLS) same.add(u);
  doc.sameAs = [...same];

  const based = new Set(Array.isArray(doc.isBasedOn) ? doc.isBasedOn.map(String) : []);
  for (const u of OWNER_GATE_URLS) based.add(u);
  doc.isBasedOn = [...based];

  const byId = new Map();
  for (const entry of Array.isArray(doc.subjectOf) ? doc.subjectOf : []) {
    if (entry && typeof entry === "object" && entry["@id"]) byId.set(String(entry["@id"]), entry);
  }
  for (const entry of ownerGateSubjectOfEntries()) {
    byId.set(String(entry["@id"]), entry);
  }
  doc.subjectOf = [...byId.values()];

  const distByUrl = new Map();
  for (const entry of Array.isArray(doc.distribution) ? doc.distribution : []) {
    if (!entry || typeof entry !== "object") continue;
    const u = entry.contentUrl || entry.url;
    if (u) distByUrl.set(String(u), entry);
  }
  for (const entry of ownerGateDistributionEntries()) {
    const prev = distByUrl.get(entry.contentUrl) || {};
    distByUrl.set(entry.contentUrl, { ...prev, ...entry });
  }
  doc.distribution = [...distByUrl.values()];

  return doc;
}
