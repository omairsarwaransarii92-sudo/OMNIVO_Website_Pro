"use client";

import { FormEvent, useEffect, useState } from "react";

const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://omnivo-website-pro-7pnj.vercel.app/api"
    : "http://127.0.0.1:8000/api";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || defaultApiUrl;

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    const select = document.querySelector<HTMLSelectElement>("#service");
    if (service && select && Array.from(select.options).some((option) => option.value === service)) {
      select.value = service;
    }
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setSending(true);
    setStatus("");
    try {
      const response = await fetch(`${apiUrl}/enquiries/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          service: data.get("service"),
          projectStage: data.get("project-stage"),
          message: data.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail ?? "Your enquiry could not be sent.");
      form.reset();
      setStatus("Thanks. Your enquiry has been received.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send your enquiry right now.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={submit}>
      <div className="form-heading"><span className="form-kicker">Project enquiry</span><h2>Give us the starting point.</h2><p>Choose a service if you know it. If not, describe the need and leave the choice open.</p></div>
      <div className="form-row"><label htmlFor="name">Your name <span>*</span><input id="name" name="name" autoComplete="name" required placeholder="Your name" /></label><label htmlFor="email">Email address <span>*</span><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label></div>
      <label htmlFor="company">Company or team <span className="optional">Optional</span><input id="company" name="company" autoComplete="organization" placeholder="Company or project name" /></label>
      <div className="form-row"><label htmlFor="service">Service area <span className="optional">Optional</span><select id="service" name="service"><option value="">Not sure yet</option><option value="custom-software">Custom software development</option><option value="ai-agents">AI agent development</option><option value="web-applications">Web application development</option><option value="mobile-applications">Mobile application development</option><option value="sqa-ai-testing">SQA / AI testing</option></select></label><label htmlFor="project-stage">Project stage <span className="optional">Optional</span><select id="project-stage" name="project-stage"><option value="">Choose if useful</option><option value="idea">Early idea</option><option value="planning">Planning scope</option><option value="existing">Existing product or workflow</option><option value="quality">Quality or testing question</option><option value="exploring">Exploring options</option></select></label></div>
      <label htmlFor="message">What are you trying to improve? <span>*</span><textarea id="message" name="message" rows={5} required placeholder="What is difficult today? Who is affected? Mention current tools, key constraints, or how you would assess a better result." /></label>
      <button className="button button-primary form-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Send project enquiry"} <span aria-hidden="true">↗</span></button>
      <p className="form-note">Your details are stored securely in the OMNIVO project enquiry inbox.</p><p className="form-status" role="status" aria-live="polite">{status}</p>
    </form>
  );
}