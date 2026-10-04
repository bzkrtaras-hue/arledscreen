import type { Locale } from "@/lib/i18n";
import { Header, type MenuGroup, type MenuLink } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { FloatingSocialRail } from "@/components/layout/FloatingSocialRail";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PRODUCT_GROUPS, productGroupPath } from "@/content/categories";
import { ARTICLE_LINKS } from "@/content/article-links";
import { modelPath, modelsForGroup } from "@/content/models";
import { listSeoGuides } from "@/content/seo-guides";
import { optSrc } from "@/lib/opt";

interface SiteShellProps {
  locale: Locale;
  children: React.ReactNode;
}

export function SiteShell({ locale, children }: SiteShellProps) {
  const tr = locale === "tr";
  // Menu data is prepared on the server so the client header stays small.
  const groups: MenuGroup[] = tr
    ? PRODUCT_GROUPS.map((g) => ({
        href: productGroupPath(g),
        name: g.name,
        family: g.family,
        short: g.short,
        tag: g.tag,
        img: optSrc(g.cardImage ?? g.image, 480),
        imgAlt: g.imageAlt,
        pitches: modelsForGroup(g.slug).map((m) => ({ label: m.chip, href: modelPath(m) })),
      }))
    : [];
  const guides: MenuLink[] = tr
    ? [
        ...ARTICLE_LINKS,
        ...listSeoGuides("tr").map((g) => ({ href: `/tr/rehber/${g.slug}/`, label: g.cardLabel })),
        { href: "/tr/sss/", label: "Sık sorulan sorular" },
      ]
    : [];

  return (
    <MotionProvider>
      <div className="has-mobile-cta flex min-h-screen flex-col">
        <a href="#main-content" className="skip-link">
          {tr ? "İçeriğe geç" : "Skip to main content"}
        </a>
        {/* Fixed liquid-glass chrome floats over page content so blur reads clearly. */}
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
          <div className="pointer-events-auto relative z-50">
            <TopBar locale={locale} />
            <Header locale={locale} groups={groups} guides={guides} />
          </div>
        </div>
        <main
          id="main-content"
          className="flex-1 pt-[7.5rem] md:pt-[8.25rem]"
        >
          {children}
        </main>
        <Footer locale={locale} />
        <FloatingSocialRail locale={locale} />
        <MobileCtaBar locale={locale} />
      </div>
    </MotionProvider>
  );
}
