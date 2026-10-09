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
  return installGuideMetadata("huidu-led-ekran-kurulumu", params);
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  return <InstallGuidePage slug="huidu-led-ekran-kurulumu" params={params} />;
}
