import Link from "next/link";
import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { absoluteUrl } from "@/lib/site";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, WHATSAPP_HREF } from "@/lib/social";

export type QA = { question: string; answer: string; links?: { href: string; label: string }[] };

export const IDENTITY =
  "ARLEDSCREEN, İstanbul merkezli LED ekran üreticisidir; satış, montaj ve teknik servisi de kendisi yapar.";
export const WARRANTY = "2 yıl garanti ve 5 yıl ücretsiz teknik servis";
export const HUB = { href: "/tr/teknik-destek/", label: "Teknik Destek" };

/** FAQPage = exactly the visible Q&A list rendered by <QaList>. */
export function SupportJsonLd({
  url,
  crumbs,
  faqs,
  serviceType,
}: {
  url: string;
  crumbs: { name: string; path: string }[];
  faqs: QA[];
  serviceType?: string;
}) {
  const graph: object[] = [
    {
      "@type": "FAQPage",
      "@id": `${url}#faqpage`,
      url,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
  if (serviceType)
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      serviceType,
      url,
      provider: { "@id": absoluteUrl("/#organization") },
      areaServed: [
        { "@type": "City", name: "İstanbul" },
        { "@type": "Country", name: "Türkiye" },
      ],
    });
  return (
    <>
      <BreadcrumbJsonLd items={crumbs.map((c) => ({ name: c.name, item: absoluteUrl(c.path) }))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
      />
    </>
  );
}

export function SupportShell({
  eyebrow,
  h1,
  crumbs,
  children,
}: {
  eyebrow: string;
  h1: string;
  crumbs: { name: string; path: string }[];
  children: ReactNode;
}) {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-ink-muted">
          {crumbs.map((c, i) => (
            <span key={c.path}>
              {i > 0 ? " › " : ""}
              {i < crumbs.length - 1 ? (
                <Link href={c.path} className="hover:underline">
                  {c.name}
                </Link>
              ) : (
                c.name
              )}
            </span>
          ))}
        </nav>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-bold leading-tight text-ink">{h1}</h1>
        {children}
        <ContactBox />
      </div>
    </section>
  );
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-10 font-display text-xl font-bold text-ink md:text-2xl">
      {children}
    </h2>
  );
}

export function QaList({ items }: { items: QA[] }) {
  return (
    <div className="glass-card mt-4 divide-y divide-border rounded-card">
      {items.map((f) => (
        <details key={f.question} className="group px-5 py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-[15.5px] font-bold text-ink">
            <h3 className="text-[15.5px]">{f.question}</h3>
            <span className="text-xl text-cyan transition group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="pb-3 text-[15px] leading-relaxed text-ink-soft">{f.answer}</p>
          {f.links?.length ? (
            <p className="flex flex-wrap gap-x-3 gap-y-1 pb-5 text-sm">
              {f.links.map((l) => (
                <Link key={l.href} href={l.href} className="font-semibold text-cyan hover:underline">
                  {l.label} →
                </Link>
              ))}
            </p>
          ) : null}
        </details>
      ))}
    </div>
  );
}

export function ContactBox() {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-band/40 p-5 text-sm text-ink-soft">
      <p className="font-semibold text-ink">Teknik destek talebi</p>
      <p className="mt-1">Servis yanıtı hemen. {WARRANTY}.</p>
      <p className="mt-3 flex flex-wrap gap-3">
        <a href={WHATSAPP_HREF} className="inline-flex min-h-11 items-center rounded-full bg-cyan px-5 font-semibold text-white">
          WhatsApp
        </a>
        <a href={CONTACT_PHONE_HREF} className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">
          {CONTACT_PHONE_DISPLAY}
        </a>
        <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center font-semibold text-cyan hover:underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
}
