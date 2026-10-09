import {
  InstallGuidePage,
  installGuideMetadata,
  installGuideStaticParams,
} from "../_install-guide";

export const dynamicParams = false;
export function generateStaticParams() {
  return installGuideStaticParams();
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return installGuideMetadata("led-ekran-kurulumu", params);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <InstallGuidePage slug="led-ekran-kurulumu" params={params} />;
}
