import { SITE_URL, absoluteUrl } from "@/lib/site";
import { GEO_REVIEWED } from "@/content/short-answers";
import { GUIDE_I18N_MODIFIED, GUIDE_PUBLISHED } from "@/content/guide-dates";

/**
 * GEO paket 3 — shared Article JSON-LD pieces for the guide templates.
 * Author stays the Organization that exists in the site graph (`/#organization`);
 * no Person is attached because no source confirms that a named person wrote the guides
 * (Aras Bozkurt is confirmed only as founder, which the Organization node already carries).
 */
export const GUIDE_AUTHOR = {
  "@type": "Organization" as const,
  "@id": `${SITE_URL}/#organization`,
  name: "ARLEDSCREEN",
  url: absoluteUrl("/tr/"),
};

/**
 * datePublished = first git commit of the guide (generated file).
 * dateModified  = the visible "Son güncelleme" date when the page shows the block
 *                 (same date, so the markup never disagrees with the page);
 *                 otherwise the last commit touching the guide copy.
 */
export function guideDates(slug: string, hasVisibleReview: boolean, fallbackModified: string = GUIDE_I18N_MODIFIED) {
  const datePublished = GUIDE_PUBLISHED[slug];
  const base = hasVisibleReview ? GEO_REVIEWED : fallbackModified;
  // A guide first published after the last review date must not claim to be modified before it was published.
  const dateModified = datePublished && datePublished > base ? datePublished : base;
  return { datePublished, dateModified };
}
