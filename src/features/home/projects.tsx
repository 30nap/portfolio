import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/features/projects/project-card";
import type { Project, UiDictionary } from "@/types/content";

export function ProjectsSection({ projects, ui }: { projects: Project[]; ui: UiDictionary }) {
  const labels = ui.sections.projects;
  const featured = projects.filter((project) => project.featured);
  if (featured.length === 0) return null;

  return (
    <Section id="projects" eyebrow={labels.eyebrow} title={labels.title} description={labels.description}>
      <ul className="grid gap-6 md:grid-cols-2">
        {featured.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} ui={ui} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
