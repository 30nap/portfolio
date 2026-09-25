import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag";
import { hasCaseStudyContent } from "@/lib/content";
import { ProjectLinks } from "@/features/projects/project-links";
import { StatusBadge } from "@/features/projects/status-badge";
import type { Project, UiDictionary } from "@/types/content";

export function ProjectCard({ project, ui }: { project: Project; ui: UiDictionary }) {
  const showCaseStudy = hasCaseStudyContent(project.caseStudy);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-border-strong">
      {project.image ? (
        <div className="border-b border-border bg-surface">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 768px) 480px, 100vw"
            className="aspect-[16/9] w-full object-cover object-top"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">
            {showCaseStudy ? (
              <Link href={`/projects/${project.slug}`} className="hover:underline hover:underline-offset-4">
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </h3>
          <StatusBadge status={project.status} label={ui.projects.status[project.status]} />
        </div>

        <p className="mt-3 text-[15px] leading-7 text-muted">{project.summary}</p>

        <TagList items={project.techStack} className="mt-5" />

        <div className="mt-auto pt-6">
          <ProjectLinks project={project} showCaseStudy={showCaseStudy} labels={ui.projects} />
        </div>
      </div>
    </article>
  );
}
