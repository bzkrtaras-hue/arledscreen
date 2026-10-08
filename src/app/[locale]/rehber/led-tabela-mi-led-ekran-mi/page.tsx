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
  return commercialGuideMetadata("led-tabela-mi-led-ekran-mi", locale);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <CommercialGuidePage slug="led-tabela-mi-led-ekran-mi" params={params} />;
}
