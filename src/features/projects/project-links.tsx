import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";
import type { Project, UiDictionary } from "@/types/content";

interface ProjectLinksProps {
  project: Project;
  showCaseStudy: boolean;
  labels: UiDictionary["projects"];
}

const baseLinkClass = "inline-flex items-center gap-1.5 text-sm font-semibold transition-all";
const linkClass = `${baseLinkClass} text-muted hover:text-accent`;
const primaryLinkClass = `${baseLinkClass} text-accent hover:gap-2.5`;

/** Renders only the links that exist. */
export function ProjectLinks({ project, showCaseStudy, labels }: ProjectLinksProps) {
  const { github, demo } = project.links;
  if (!showCaseStudy && !github && !demo) return null;

  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {showCaseStudy ? (
        <li>
          <Link href={`/projects/${project.slug}`} className={primaryLinkClass}>
            {labels.caseStudy}
            <ArrowRightIcon width={14} height={14} />
            <span className="sr-only">: {project.name}</span>
          </Link>
        </li>
      ) : null}
      {github ? (
        <li>
          <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <GitHubIcon width={14} height={14} />
            {labels.sourceCode}
            <span className="sr-only">: {project.name}</span>
          </a>
        </li>
      ) : null}
      {demo ? (
        <li>
          <a href={demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {labels.liveDemo}
            <ArrowUpRightIcon width={14} height={14} />
            <span className="sr-only">: {project.name}</span>
          </a>
        </li>
      ) : null}
    </ul>
  );
}
