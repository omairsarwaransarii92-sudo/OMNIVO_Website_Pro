import Link from "next/link";
import type { Section } from "@/lib/content";

const serviceIds = ["custom-software", "ai-agents", "web-applications", "mobile-applications", "sqa-ai-testing"];
const serviceLabels = [
  "Talk through a custom build",
  "Assess an agent use case",
  "Scope a web application",
  "Plan a mobile product",
  "Discuss testing scope",
];
const serviceIcons = ["</>", "✳", "▣", "▯", "✓"];

function HighlightText({ text, phrase }: { text: string; phrase: string }) {
  const index = text.indexOf(phrase);
  if (index < 0) return text;
  return <>{text.slice(0, index).trimEnd()}<br /><em>{text.slice(index)}</em></>;
}

function SectionImage({ section, className = "cms-inline-image" }: { section: Section; className?: string }) {
  return section.image ? <img className={className} src={section.image} alt={section.imageAlt} /> : null;
}

function ServiceCopy({ body }: { body: string }) {
  const [copy, scope] = body.split("\n\nScope prompts\n");
  const prompts = scope?.split("\n").filter((line) => line.startsWith("- ")) ?? [];
  return <>
    {copy.split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
    {prompts.length > 0 && <ul>{prompts.map((prompt) => <li key={prompt}>{prompt.slice(2)}</li>)}</ul>}
  </>;
}

export function ServicesContent({ sections }: { sections: Section[] }) {
  const services = sections.slice(0, 5);
  const faqIntro = sections[5];
  const faqItems = sections.slice(6, 10);
  const serviceNote = sections[10];
  const closing = sections[11];
  return <>
    <section className="service-detail-list" aria-label="OMNIVO services">
      {services.map((service, index) => (
        <article className="service-detail" id={serviceIds[index]} key={service.id}>
          <span className="detail-index">{String(index + 1).padStart(2, "0")}</span>
          <div className="detail-icon" aria-hidden="true">{serviceIcons[index]}</div>
          <div className="detail-body">
            <p className="eyebrow">{service.eyebrow}</p>
            <h2>{service.heading}</h2>
            <ServiceCopy body={service.body} />
            <SectionImage section={service} />
            <Link className="text-link service-action" href={`/contact?service=${serviceIds[index]}#contact-form`}>{serviceLabels[index]} <span aria-hidden="true">→</span></Link>
          </div>
          <Link className="detail-link" href={`/contact?service=${serviceIds[index]}#contact-form`} aria-label={`Enquire about ${service.heading}`}>↗</Link>
        </article>
      ))}
    </section>
    {faqIntro && <section className="section service-faq">
      <div className="faq-heading"><p className="eyebrow">{faqIntro.eyebrow}</p><h2><HighlightText text={faqIntro.heading} phrase="better scopes." /></h2><p className="section-intro">{faqIntro.body}</p><SectionImage section={faqIntro} /></div>
      <div className="faq-list">{faqItems.map((item) => <details className="faq-item" key={item.id}><summary>{item.heading}</summary><p>{item.body}</p></details>)}</div>
    </section>}
    {serviceNote && <section className="service-note">
      <div><p className="eyebrow">{serviceNote.eyebrow}</p><h2><HighlightText text={serviceNote.heading} phrase="We can scope from there." /></h2></div>
      <p>{serviceNote.body}</p>
      <SectionImage section={serviceNote} />
      <Link className="button button-primary" href="/contact">Prepare a project enquiry <span aria-hidden="true">↗</span></Link>
    </section>}
    {closing && <section className="cta-band"><div><p className="eyebrow">{closing.eyebrow}</p><h2><HighlightText text={closing.heading} phrase="the work needs." /></h2></div><Link className="button button-light" href="/contact">{closing.body} <span aria-hidden="true">↗</span></Link><span className="cta-orbit" aria-hidden="true" /></section>}
  </>;
}

export function AboutContent({ sections }: { sections: Section[] }) {
  const statement = sections[0];
  const valuesIntro = sections[1];
  const values = sections.slice(2, 6);
  const journeyIntro = sections[6];
  const steps = sections.slice(7, 10);
  const quote = sections[10];
  const closing = sections[11];
  return <>
    {statement && <section className="section about-statement"><div className="statement-label"><p className="eyebrow">{statement.eyebrow}</p><span className="statement-line" /></div><div className="statement-content"><h2><HighlightText text={statement.heading} phrase="problem behind the feature." /></h2><p>{statement.body}</p><SectionImage section={statement} /></div></section>}
    {valuesIntro && <section className="values-section"><div className="values-intro"><p className="eyebrow">{valuesIntro.eyebrow}</p><h2><HighlightText text={valuesIntro.heading} phrase="keep scope honest." /></h2><p>{valuesIntro.body}</p><SectionImage section={valuesIntro} /></div><div className="value-cards">{values.map((value, index) => <article className="value-card" key={value.id}><span>{value.eyebrow || String(index + 1).padStart(2, "0")}</span><h3>{value.heading}</h3><p>{value.body}</p><SectionImage section={value} /></article>)}</div></section>}
    {journeyIntro && <section className="section journey-section"><div className="journey-heading"><p className="eyebrow">{journeyIntro.eyebrow}</p><h2><HighlightText text={journeyIntro.heading} phrase="decisions visible." /></h2><p className="section-intro">{journeyIntro.body}</p><SectionImage section={journeyIntro} /></div><div className="journey-steps">{steps.map((step, index) => <article className="journey-step" key={step.id}><span className="journey-dot">{step.eyebrow || String(index + 1).padStart(2, "0")}</span><h3>{step.heading}</h3><p>{step.body}</p><SectionImage section={step} /></article>)}</div></section>}
    {quote && <section className="quote-section about-quote"><div className="quote-mark" aria-hidden="true">“</div><blockquote><HighlightText text={quote.heading} phrase="visible." /></blockquote><p>{quote.body}</p><SectionImage section={quote} /><Link href="/services" className="text-link">Review the service options <span aria-hidden="true">→</span></Link></section>}
    {closing && <section className="cta-band"><div><p className="eyebrow">{closing.eyebrow}</p><h2><HighlightText text={closing.heading} phrase="you’re working through." /></h2></div><Link className="button button-light" href="/contact">{closing.body} <span aria-hidden="true">↗</span></Link><SectionImage section={closing} className="cms-cta-image" /><span className="cta-orbit" aria-hidden="true" /></section>}
  </>;
}

export function HomeProcess({ sections }: { sections: Section[] }) {
  const intro = sections[2];
  if (!intro) return null;
  return <section className="section process-section"><div className="process-head"><p className="eyebrow">{intro.eyebrow}</p><h2><HighlightText text={intro.heading} phrase="the first chat clearer." /></h2><p className="section-intro">{intro.body}</p><SectionImage section={intro} /></div><div className="process-list">{sections.slice(3, 6).map((step, index) => <article className="process-step" key={step.id}><span className="step-num">{step.eyebrow || String(index + 1).padStart(2, "0")}</span><div><h3>{step.heading}</h3><p>{step.body}</p><SectionImage section={step} /></div><span className="step-symbol" aria-hidden="true">{["⌕", "⌁", "↗"][index]}</span></article>)}</div></section>;
}