import type { SkillGroup } from "@/types/content";

/** Grouped skills. No percentages — just what you work with. */
export const skills: SkillGroup[] = [
  {
    icon: "server",
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "Spring Batch", "Hibernate", "JPA", "REST API"],
  },
  {
    icon: "database",
    title: "Data",
    items: ["Oracle", "PostgreSQL", "Redis"],
  },
  {
    icon: "message",
    title: "Messaging",
    items: ["Kafka"],
  },
  {
    icon: "tools",
    title: "DevOps & Tools",
    items: ["Docker", "Git", "GitHub", "GitLab CI/CD", "Linux"],
  },
  {
    icon: "layers",
    title: "Architecture",
    items: ["Clean Architecture", "Hexagonal Architecture", "DDD", "Modular Monolith"],
  },
];
