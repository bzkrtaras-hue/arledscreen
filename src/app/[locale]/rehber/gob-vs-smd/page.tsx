import {
  CommercialGuidePage,
  commercialGuideMetadata,
  commercialGuideStaticParams,
} from "../_commercial-guide";

export const dynamicParams = false;
export function generateStaticParams() {
  return commercialGuideStaticParams();
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return commercialGuideMetadata("gob-vs-smd", locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <CommercialGuidePage slug="gob-vs-smd" params={params} />;
}
