import {
  CommercialGuidePage,
  commercialGuideMetadata,
  commercialGuideStaticParams,
} from "../_commercial-guide";

export const dynamicParams = false;
export function generateStaticParams() {
  return commercialGuideStaticParams("piksel-araligi-secimi");
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return commercialGuideMetadata("piksel-araligi-secimi", locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <CommercialGuidePage slug="piksel-araligi-secimi" params={params} />;
}
