import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { TagList } from "@/components/ui/tag";
import { ProjectLinks } from "@/features/projects/project-links";
import { StatusBadge } from "@/features/projects/status-badge";
import { hasCaseStudyContent } from "@/lib/content";
import type { CaseStudy, Project, UiDictionary } from "@/types/content";
import { withBasePath } from "@/lib/utils";

type NarrativeKey = keyof UiDictionary["caseStudy"]["sections"];

/** Display order of the case study sections. */
const SECTION_ORDER: NarrativeKey[] = [
  "problem",
  "context",
  "architecture",
  "decisions",
  "challenges",
  "solution",
  "learnings",
];

/** Sections rendered as bullet lists rather than paragraphs. */
const LIST_SECTIONS = new Set<NarrativeKey>(["decisions", "challenges", "learnings"]);

function nonEmpty(entries: string[] | undefined): string[] {
  return (entries ?? []).filter((entry) => entry.trim() !== "");
}

export function CaseStudyView({ project, ui }: { project: Project; ui: UiDictionary }) {
  const labels = ui.caseStudy;
  const caseStudy: CaseStudy = project.caseStudy ?? {};
  const hasContent = hasCaseStudyContent(caseStudy);
  const technologies = nonEmpty(caseStudy.technologies).length > 0 ? nonEmpty(caseStudy.technologies) : project.techStack;
  const sections = SECTION_ORDER.map((key) => ({ key, entries: nonEmpty(caseStudy[key]) })).filter(
    (section) => section.entries.length > 0,
  );

  return (
    <Container size="narrow" className="py-14 sm:py-20">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon width={14} height={14} />
        {labels.back}
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
          <StatusBadge status={project.status} label={ui.projects.status[project.status]} />
        </div>
        <p className="mt-4 text-lg leading-8 text-muted">{project.summary}</p>
        <div className="mt-6">
          <ProjectLinks project={project} showCaseStudy={false} labels={ui.projects} />
        </div>
      </header>

      {project.image ? (
        <div className="mt-12 overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={withBasePath(project.image.src)}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 768px) 720px, 100vw"
            priority
            className="w-full"
          />
        </div>
      ) : null}

      <section aria-labelledby="technologies-heading" className="mt-12 border-t border-border pt-8">
        <h2 id="technologies-heading" className="eyebrow">
          {labels.technologies}
        </h2>
        <TagList items={technologies} className="mt-4" />
      </section>

      {hasContent ? (
        sections.map(({ key, entries }) => (
          <section key={key} aria-labelledby={`${key}-heading`} className="mt-12 border-t border-border pt-8">
            <h2 id={`${key}-heading`} className="text-xl font-semibold tracking-tight">
              {labels.sections[key]}
            </h2>
            {LIST_SECTIONS.has(key) ? (
              <ul className="mt-5 space-y-3 text-base leading-7 text-muted">
                {entries.map((entry) => (
                  <li key={entry} className="flex gap-3">
                    <span aria-hidden="true" className="mt-3.5 h-px w-3 shrink-0 bg-subtle" />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 space-y-4 text-base leading-7 text-muted">
                {entries.map((entry) => (
                  <p key={entry}>{entry}</p>
                ))}
              </div>
            )}
          </section>
        ))
      ) : (
        <section className="mt-12 rounded-xl border border-dashed border-border-strong p-8 text-center">
          <h2 className="text-base font-semibold">{labels.pendingTitle}</h2>
          <p className="mt-2 text-sm text-muted">{labels.pendingBody}</p>
        </section>
      )}
    </Container>
  );
}
