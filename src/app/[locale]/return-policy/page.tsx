/**
 * EN return / cancellation / delivery policy at /en/return-policy/.
 * Same component and content as /tr/iade-politikasi/ (single source of truth).
 */
export { generateMetadata, default } from "../iade-politikasi/page";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}
