import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/features/projects/case-study-view";
import { getContent, getProject, hasCaseStudyContent } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

// Only slugs defined in src/data are valid; everything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getContent().projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(getContent().projects, slug);
  if (!project) return {};

  return buildMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
    // Placeholder pages stay out of search results until they have content.
    noIndex: !hasCaseStudyContent(project.caseStudy),
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const { projects, ui } = getContent();
  const project = getProject(projects, slug);
  if (!project) notFound();

  return <CaseStudyView project={project} ui={ui} />;
}
