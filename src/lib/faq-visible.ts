/**
 * Visible FAQ filter. The legacy-domain disclaimer ("arleds.com ile arledscreen.com aynı mı?")
 * is meant for AI agents/directories only: it stays in llms.txt, entity.json and FAQPage
 * JSON-LD, but is not shown in customer-visible FAQ lists.
 */
export function isDomainDisclaimerFaq(f: { question: string }): boolean {
  return f.question.includes("arleds.com");
}

export function visibleFaqs<T extends { question: string }>(faqs: readonly T[]): T[] {
  return faqs.filter((f) => !isDomainDisclaimerFaq(f));
}
