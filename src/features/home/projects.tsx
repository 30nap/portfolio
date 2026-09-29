import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/features/projects/project-card";
import type { Project, UiDictionary } from "@/types/content";

export function ProjectsSection({ projects, ui }: { projects: Project[]; ui: UiDictionary }) {
  const labels = ui.sections.projects;
  const featured = projects.filter((project) => project.featured);
  if (featured.length === 0) return null;

  return (
    <Section id="projects" title={labels.title} description={labels.description}>
      <ul>
        {featured.map((project) => (
          <li key={project.slug} className="border-t border-border py-10 first:border-t-0 first:pt-0 last:pb-0">
            <ProjectCard project={project} ui={ui} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
