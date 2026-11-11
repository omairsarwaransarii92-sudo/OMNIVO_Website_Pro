import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { AboutContent, ServicesContent } from "@/components/page-content";
import { PageHero, SiteFooter, SiteHeader, StyledHeading } from "@/components/site";
import { getPage } from "@/lib/content";

export const dynamic = "force-dynamic";

const pages = ["services", "about", "contact"];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  return page ? {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.seoKeywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
    openGraph: { type: "website", siteName: "OMNIVO", title: page.seoTitle, description: page.seoDescription },
    twitter: { card: "summary", title: page.seoTitle, description: page.seoDescription },
  } : {};
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pages.includes(slug)) notFound();
  const page = await getPage(slug);
  if (!page) notFound();
  const index = slug === "services" ? "02" : slug === "about" ? "03" : "04";
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">Skip to content</a><SiteHeader active={slug} />
      <main id="main">
        {slug === "contact" ? <section className="contact-hero">
          <div className="breadcrumb"><a href="/">Home</a><span>/</span><span>{page.name}</span></div>
          <div className="contact-hero-grid">
            <div className="contact-intro"><p className="eyebrow"><span className="status-dot" /> {page.eyebrow}</p><h1><StyledHeading slug="contact" heading={page.heading} /></h1><p className="hero-copy">{page.intro}</p>
              {page.sections[4] && <div className="contact-promise"><span className="promise-icon" aria-hidden="true">↗</span><p><strong>{page.sections[4].heading}</strong><br />{page.sections[4].body}</p></div>}
              <div className="contact-details">{page.sections.slice(1, 4).map((section) => <div key={section.id}><span className="footer-label">{section.eyebrow}</span><span>{section.body}</span>{section.image && <img className="cms-inline-image" src={section.image} alt={section.imageAlt} />}</div>)}</div>
              {page.heroImage && <img className="contact-page-image" src={page.heroImage} alt="" />}
            </div>
            <ContactForm />
          </div><div className="hero-aside contact-aside"><span>04 / 04</span><span className="aside-line" /><span>Project enquiry</span></div>
        </section> : <><PageHero page={page} index={index} />{slug === "services" ? <ServicesContent sections={page.sections} /> : <AboutContent sections={page.sections} />}</>}
        {slug === "contact" && page.sections[0] && <section className="contact-next"><div className="next-symbol" aria-hidden="true">✳</div><div><p className="eyebrow">Not ready with a full specification?</p><h2>{page.sections[0].heading}</h2></div><p>{page.sections[0].body}</p></section>}
      </main><SiteFooter />
    </div>
  );
}