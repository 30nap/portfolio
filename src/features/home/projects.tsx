import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/features/projects/project-card";
import type { Project, UiDictionary } from "@/types/content";

export function ProjectsSection({ projects, ui }: { projects: Project[]; ui: UiDictionary }) {
  const labels = ui.sections.projects;
  const featured = projects.filter((project) => project.featured);
  if (featured.length === 0) return null;

  return (
    <Section id="projects" icon="folder" eyebrow={labels.eyebrow} title={labels.title} description={labels.description}>
      <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {featured.map((project, index) => (
          <li key={project.slug} className="reveal flex">
            <ProjectCard project={project} ui={ui} index={index} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
