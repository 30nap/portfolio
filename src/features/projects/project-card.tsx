import Image from "next/image";
import Link from "next/link";
import { TagList } from "@/components/ui/tag";
import { ProjectLinks } from "@/features/projects/project-links";
import { StatusBadge } from "@/features/projects/status-badge";
import { hasCaseStudyContent } from "@/lib/content";
import { cn, withBasePath } from "@/lib/utils";
import type { Project, UiDictionary } from "@/types/content";

/** Banner tints for projects without a screenshot, picked by position so neighbours differ. */
const BANNERS = [
  "from-accent/25 via-accent/10 to-accent-2/20",
  "from-accent-2/25 via-accent-2/10 to-accent/20",
];

export function ProjectCard({ project, ui, index = 0 }: { project: Project; ui: UiDictionary; index?: number }) {
  const showCaseStudy = hasCaseStudyContent(project.caseStudy);

  return (
    <article className="card card-hover group flex w-full flex-col overflow-hidden">
      {project.image ? (
        <div className="overflow-hidden border-b border-border bg-surface">
          <Image
            src={withBasePath(project.image.src)}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 768px) 560px, 100vw"
            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={cn(
            "relative flex h-40 items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br",
            BANNERS[index % BANNERS.length],
          )}
        >
          <div className="bg-grid absolute inset-0 opacity-60 [mask-image:none]" />
          {/* The project's core stack drawn as a small flow of nodes. */}
          <div dir="ltr" className="relative flex items-center transition-transform duration-500 group-hover:scale-105">
            {project.techStack.slice(0, 3).map((tech, techIndex) => (
              <div key={tech} className="flex items-center">
                {techIndex > 0 ? (
                  <span className="h-px w-5 bg-gradient-to-r from-accent/60 to-accent-2/60 sm:w-8" />
                ) : null}
                <span
                  className={cn(
                    "rounded-xl border bg-card/90 px-3 py-2 text-xs font-bold shadow-md backdrop-blur-sm sm:text-sm",
                    techIndex === 0 ? "border-accent/40 text-accent" : "border-border text-foreground/80",
                  )}
                >
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold">
            {showCaseStudy ? (
              <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-accent">
                {project.name}
              </Link>
            ) : (
              project.name
            )}
          </h3>
          <StatusBadge status={project.status} label={ui.projects.status[project.status]} />
        </div>

        <p className="mt-3 text-[15px] leading-8 text-muted">{project.summary}</p>

        <TagList items={project.techStack} className="mt-5" />

        <div className="mt-auto border-t border-border pt-5">
          <ProjectLinks project={project} showCaseStudy={showCaseStudy} labels={ui.projects} />
        </div>
      </div>
    </article>
  );
}
