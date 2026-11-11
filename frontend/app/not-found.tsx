import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site";

export default function NotFound() {
  return <div className="page-shell"><SiteHeader active="" /><main className="not-found"><p className="eyebrow">404 / Not found</p><h1>This page isn’t here.</h1><Link className="button button-primary" href="/">Return home <span aria-hidden="true">↗</span></Link></main><SiteFooter /></div>;
}