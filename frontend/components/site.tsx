"use client";

import { useState } from "react";
import Link from "next/link";
import type { Banner, PageContent, Project, Section } from "@/lib/content";

const navigation = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function StyledHeading({ slug, heading }: { slug: string; heading: string }) {
  if (slug === "home") {
    const accent = "AI agents & apps";
    const start = heading.indexOf(accent);
    if (start >= 0) {
      return <>{heading.slice(0, start).trimEnd()}<br /><em>{accent}</em><br />{heading.slice(start + accent.length).trimStart()}</>;
    }
  }
  if (slug === "services") {
    const split = heading.indexOf(" for ");
    if (split >= 0) return <>{heading.slice(0, split)}<br /><em>for {heading.slice(split + 5)}</em></>;
  }
  if (slug === "about") {
    const split = heading.indexOf(" with ");
    if (split >= 0) return <>{heading.slice(0, split)}<br />with <em>{heading.slice(split + 6)}</em></>;
  }
  if (slug === "contact") {
    const split = heading.indexOf(" work better");
    if (split >= 0) return <>{heading.slice(0, split)}<br /><em>{heading.slice(split + 1)}</em></>;
  }
  return heading;
}

export function SiteHeader({ active }: { active: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ctaHref = active === "contact" ? "#contact-form" : "/contact";
  const ctaLabel = active === "contact" ? "Project enquiry" : "Let’s talk";
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="OMNIVO home">
        <img className="brand-logo" src="/assets/omnivo-logo.webp" alt="" />
        <span className="brand-word">OMNIVO</span>
      </Link>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
      <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
        {navigation.map(([label, href]) => (
          <Link key={href} href={href} aria-current={active === label.toLowerCase() ? "page" : undefined}>
            {label}
          </Link>
        ))}
      </nav>
      <Link className="header-cta" href={ctaHref}>{ctaLabel} <span aria-hidden="true">↗</span></Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand" href="/" aria-label="OMNIVO home">
          <img className="brand-logo" src="/assets/omnivo-logo.webp" alt="" />
          <span className="brand-word">OMNIVO</span>
        </Link>
        <p>Software for work<br />that matters.</p>
        <div className="footer-links">
          <div><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/about">About OMNIVO</Link><Link href="/contact">Contact</Link></div>
          <div><span className="footer-label">Project enquiry</span><Link href="/contact">Share a project brief <span aria-hidden="true">↗</span></Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} OMNIVO</span><span>Custom software · AI · applications · testing</span></div>
    </footer>
  );
}

export function PageHero({ page, index }: { page: PageContent; index: string }) {
  const cta = page.slug === "services" ? "Find the right starting point" : page.slug === "about" ? "Talk through the need" : "Project enquiry";
  const aside = page.slug === "services" ? "Explore by need" : page.slug === "about" ? "Principles for project fit" : "Project enquiry";
  return (
    <section className="inner-hero">
      <div className="inner-hero-glow" aria-hidden="true" />
      {page.heroImage && <div className="inner-hero-image" aria-hidden="true"><img src={page.heroImage} alt="" /></div>}
      <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{page.name}</span></div>
      <p className="eyebrow"><span className="status-dot" /> {page.eyebrow}</p>
      <h1><StyledHeading slug={page.slug} heading={page.heading} /></h1>
      <p className="hero-copy">{page.intro}</p>
      <Link className="button button-primary" href={page.slug === "contact" ? "#contact-form" : "/contact"}>{cta} <span aria-hidden="true">↗</span></Link>
      <div className="hero-aside inner-aside"><span>{index} / 04</span><span className="aside-line" /><span>{aside}</span></div>
    </section>
  );
}

export function ContentSections({ sections }: { sections: Section[] }) {
  return (
    <div className="cms-sections">
      {sections.map((section, index) => (
        <section className={`section cms-section ${index % 2 ? "cms-section-alt" : ""}`} id={sectionAnchor(section.heading)} key={section.id}>
          <div className="cms-section-copy">
            {section.eyebrow && <p className="eyebrow">{section.eyebrow}</p>}
            <h2>{section.heading}</h2>
            {section.body && <p className="section-intro">{section.body}</p>}
          </div>
          {section.image && <img className="cms-section-image" src={section.image} alt={section.imageAlt} />}
        </section>
      ))}
    </div>
  );
}

function sectionAnchor(heading: string) {
  if (heading.toLowerCase().includes("custom software")) return "custom-software";
  if (heading.toLowerCase().includes("agent")) return "ai-agent-development";
  if (heading.toLowerCase().includes("web application")) return "web-application";
  if (heading.toLowerCase().includes("mobile application")) return "mobile-application";
  if (heading.toLowerCase().includes("quality assurance")) return "sqa-ai-testing";
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BannerStrip({ banners }: { banners: Banner[] }) {
  if (!banners.length) return null;
  return (
    <section className="banner-strip" aria-label="Announcements">
      {banners.map((banner) => {
        const content = <><img src={banner.image} alt={banner.imageAlt} /><span><strong>{banner.title}</strong>{banner.subtitle && <span>{banner.subtitle}</span>}</span><b aria-hidden="true">↗</b></>;
        return banner.linkUrl ? <a className="banner-item" href={banner.linkUrl} key={banner.id}>{content}</a> : <div className="banner-item" key={banner.id}>{content}</div>;
      })}
    </section>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <section className="section project-section" id="projects">
      <div className="section-heading"><p className="eyebrow">Selected work</p><h2>Projects, made <em>visible.</em></h2><p className="section-intro">A selection of projects managed by the OMNIVO team.</p></div>
      <div className="project-grid">
        {projects.map((project) => (
          <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}>
            {project.image && <img src={project.image} alt={project.imageAlt} />}
            <div><span className="card-number">{project.services.join(" · ") || "Project"}</span><h3>{project.title}</h3><p>{project.summary}</p><span className="text-link">View project <span aria-hidden="true">↗</span></span></div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PageShell({ page, active, children }: { page: PageContent; active: string; children?: React.ReactNode }) {
  return <div className="page-shell"><a className="skip-link" href="#main">Skip to content</a><SiteHeader active={active} /><main id="main"><PageHero page={page} index={active === "services" ? "02" : active === "about" ? "03" : "04"} />{children ?? <ContentSections sections={page.sections} />}</main><SiteFooter /></div>;
}