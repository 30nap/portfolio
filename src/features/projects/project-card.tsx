import Image from "next/image";
import Link from "next/link";
import { TechList } from "@/components/ui/tag";
import { ProjectLinks } from "@/features/projects/project-links";
import { StatusBadge } from "@/features/projects/status-badge";
import { hasCaseStudyContent } from "@/lib/content";
import { withBasePath } from "@/lib/utils";
import type { Project, UiDictionary } from "@/types/content";

/** A project as a ledger entry: the name set large, then what it is, what it runs on and where to see it. */
export function ProjectCard({ project, ui }: { project: Project; ui: UiDictionary }) {
  const showCaseStudy = hasCaseStudyContent(project.caseStudy);

  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="text-4xl leading-tight font-black sm:text-5xl">
          <span dir="ltr">
            {showCaseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="underline decoration-transparent decoration-4 underline-offset-[10px] transition-colors hover:decoration-accent"
              >
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </span>
        </h3>
        <StatusBadge status={project.status} label={ui.projects.status[project.status]} />
      </div>

      <p className="mt-4 max-w-[62ch] text-base leading-8 text-muted sm:text-[17px] sm:leading-9">{project.summary}</p>

      <TechList items={project.techStack} label={ui.caseStudy.technologies} className="mt-5 max-w-[62ch]" />

      {project.image ? (
        <div className="mt-8 overflow-hidden rounded-md border border-border bg-surface">
          <Image
            src={withBasePath(project.image.src)}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="aspect-[16/9] w-full object-cover object-top"
          />
        </div>
      ) : null}

      <div className="mt-6">
        <ProjectLinks project={project} showCaseStudy={showCaseStudy} labels={ui.projects} />
      </div>
    </article>
  );
}
