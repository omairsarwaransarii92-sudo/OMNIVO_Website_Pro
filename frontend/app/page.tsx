import Link from "next/link";
import type { Metadata } from "next";
import { BannerStrip, ProjectGrid, SiteFooter, SiteHeader, StyledHeading } from "@/components/site";
import { HomeProcess } from "@/components/page-content";
import { getBanners, getPage, getProjects } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("home");
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.seoKeywords.split(",").map((keyword) => keyword.trim()).filter(Boolean),
    openGraph: { type: "website", siteName: "OMNIVO", title: page.seoTitle, description: page.seoDescription },
    twitter: { card: "summary", title: page.seoTitle, description: page.seoDescription },
  };
}

const services = [
  ["01 / 05", "</>", "Custom software", "For a workflow with a clear gap that existing products may not fit.", "custom-software"],
  ["02 / 05", "✳", "AI agent development", "For context-heavy tasks where actions and human review need clear boundaries.", "ai-agent-development"],
  ["03 / 05", "▣", "Web applications", "For browser-based tools shaped around specific users and journeys.", "web-application"],
  ["04 / 05", "▯", "Mobile applications", "For product experiences where the device and moment of use matter.", "mobile-application"],
  ["05 / 05", "✓", "SQA & AI testing", "For teams that need clearer evidence about software and AI behavior.", "sqa-ai-testing"],
];
const serviceIds = ["custom-software", "ai-agent-development", "web-application", "mobile-application", "sqa-ai-testing"];
const serviceIcons = ["</>", "✳", "▣", "▯", "✓"];

function AccentTitle({ text, phrase }: { text: string; phrase: string }) {
  const index = text.indexOf(phrase);
  if (index < 0) return text;
  return <>{text.slice(0, index).trimEnd()}<br /><em>{text.slice(index)}</em></>;
}

export default async function HomePage() {
  const [page, banners, projects] = await Promise.all([getPage("home"), getBanners(), getProjects(true)]);
  const heading = page?.heading ?? "Custom software, AI agents & apps for real work.";
  const intro = page?.intro ?? "OMNIVO develops custom software, AI agents, web and mobile applications, and SQA/AI testing. Start with a business or product need; choose the technology only after the job is clear.";
  const serviceCards = page && page.sections.length >= 11
    ? page.sections.slice(6, 11).map((section, index) => [section.eyebrow, serviceIcons[index], section.heading, section.body, serviceIds[index]] as [string, string, string, string, string])
    : services;
  const serviceIntro = page?.sections[0];
  const decision = page?.sections[1];
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">Skip to content</a><SiteHeader active="home" />
      <main id="main">
        <section className="hero hero-home">
          <div className="hero-visual" aria-hidden="true"><img src={page?.heroImage || "/assets/hero-network.png"} alt="" /><div className="hero-visual-shade" /><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
          <div className="hero-content"><p className="eyebrow"><span className="status-dot" /> {page?.eyebrow ?? "Software for real business needs"}</p><h1><StyledHeading slug="home" heading={heading} /></h1><p className="hero-copy">{intro}</p><div className="hero-actions"><Link className="button button-primary" href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/services">Explore capabilities <span aria-hidden="true">→</span></Link></div><div className="hero-proof"><div className="proof-avatars" aria-hidden="true"><span>01</span><span>02</span><span>03</span></div><p><strong>Start with the work.</strong><br />Define the need before choosing a build path.</p></div></div>
          <div className="hero-aside"><span>01 / 04</span><span className="aside-line" /><span>Build for the task</span></div><a className="scroll-cue" href="#services-preview"><span className="scroll-cue-line" /> See where to start</a>
        </section>
        <section className="trust-strip" aria-label="Project starting points"><span>One business need. A few possible build paths.</span><div className="trust-points"><span><b>01</b> Define the workflow</span><span><b>02</b> Choose the right fit</span><span><b>03</b> Agree the evidence</span></div></section>
        <BannerStrip banners={banners} />
        <section className="section services-preview" id="services-preview"><div className="section-heading"><p className="eyebrow">{serviceIntro?.eyebrow ?? "Five service areas"}</p><h2><AccentTitle text={serviceIntro?.heading ?? "Choose a starting point. Keep the goal in view."} phrase="Keep the goal in view." /></h2><p className="section-intro">{serviceIntro?.body ?? "Each capability solves a different kind of product or process challenge. Use the service guide to compare fit and scope."}</p>{serviceIntro?.image && <img className="cms-inline-image" src={serviceIntro.image} alt={serviceIntro.imageAlt} />}</div><div className="service-grid">{serviceCards.map(([number, icon, title, description, slug]) => <Link className="service-card" href={`/services#${slug}`} key={number}><span className="card-number">{number}</span><span className="service-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{description}</p><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</div><Link className="button button-outline" href="/services">Compare the services <span aria-hidden="true">→</span></Link></section>
        <section className="section split-section"><div className="split-art" aria-hidden="true"><div className="art-frame"><div className="art-grid" /><div className="art-ring ring-a" /><div className="art-ring ring-b" /><div className="art-center"><img className="brand-logo" src="/assets/omnivo-logo.webp" alt="" /></div><div className="art-label label-top">The need</div><div className="art-label label-bottom">The right fit</div><span className="art-orb" /></div><p className="art-caption">Build less by default.<br /><strong>Solve the right gap.</strong></p></div><div className="split-copy"><p className="eyebrow">{decision?.eyebrow ?? "Build, adapt or automate?"}</p><h2><AccentTitle text={decision?.heading ?? "Don’t start with a tool. Start with the task."} phrase="Start with the task." /></h2><p>{decision?.body ?? "A custom build is not automatically better than adapting an existing product. An AI agent is not automatically better than straightforward automation. Compare the workflow, exceptions, current systems and risks before committing to an approach."}</p>{decision?.image && <img className="cms-inline-image" src={decision.image} alt={decision.imageAlt} />}<div className="metric-row"><div><strong>Workflow</strong><span>What needs to change?</span></div><div><strong>Fit</strong><span>Build, adapt or automate?</span></div><div><strong>Evidence</strong><span>How will it be evaluated?</span></div></div><Link className="text-link" href="/about">How OMNIVO thinks about scope <span aria-hidden="true">→</span></Link></div></section>
        <HomeProcess sections={page?.sections ?? []} />
        <ProjectGrid projects={projects} />
        <section className="quote-section"><div className="quote-mark" aria-hidden="true">“</div><blockquote>Choose technology for the task it needs to do—not because it is <em>new.</em></blockquote><p>A useful starting principle for custom software, AI agents, applications and testing.</p><Link href="/services" className="text-link">See the service guide <span aria-hidden="true">→</span></Link></section>
        <section className="cta-band"><div><p className="eyebrow">Have a defined challenge or an early idea?</p><h2>Bring the problem.<br /><em>We’ll help scope the question.</em></h2></div><Link className="button button-light" href="/contact">Start a project enquiry <span aria-hidden="true">↗</span></Link><span className="cta-orbit" aria-hidden="true" /></section>
      </main><SiteFooter />
    </div>
  );
}