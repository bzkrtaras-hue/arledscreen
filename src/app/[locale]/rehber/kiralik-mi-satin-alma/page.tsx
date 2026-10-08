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
  return commercialGuideMetadata("kiralik-mi-satin-alma", locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <CommercialGuidePage slug="kiralik-mi-satin-alma" params={params} />;
}
