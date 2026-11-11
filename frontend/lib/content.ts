export type Section = {
  id: number;
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type PageContent = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  eyebrow: string;
  heading: string;
  intro: string;
  heroImage: string;
  sections: Section[];
};

export type Banner = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  linkUrl: string;
};

export type Project = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  services: string[];
  featured: boolean;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiUrl}${path}`, { cache: "no-store" });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getPage(slug: string): Promise<PageContent | null> {
  return getJson<PageContent>(`/pages/${slug}/`);
}

export async function getBanners(): Promise<Banner[]> {
  return (await getJson<Banner[]>("/banners/")) ?? [];
}

export async function getProjects(featured = false): Promise<Project[]> {
  return (await getJson<Project[]>(`/projects/${featured ? "?featured=true" : ""}`)) ?? [];
}

export async function getProject(slug: string): Promise<Project | null> {
  return getJson<Project>(`/projects/${slug}/`);
}