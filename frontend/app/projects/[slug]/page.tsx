import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site";
import { getProject } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  return <div className="page-shell"><SiteHeader active="projects" /><main id="main" className="project-detail"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#projects">Projects</Link><span>/</span><span>{project.title}</span></div><p className="eyebrow">{project.services.join(" · ") || "Project"}</p><h1>{project.title}</h1><p className="hero-copy">{project.summary}</p>{project.image && <img className="project-detail-image" src={project.image} alt={project.imageAlt} />}<div className="project-description">{project.description.split("\n").map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}</div><Link className="text-link" href="/#projects">← Back to projects</Link></main><SiteFooter /></div>;
}