import type { SkillGroup } from "@/types/content";

/** Grouped skills. No percentages — just what you work with. */
export const skills: SkillGroup[] = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "Spring Batch", "Hibernate", "JPA", "REST API"],
  },
  {
    title: "Data",
    items: ["Oracle", "PostgreSQL", "Redis"],
  },
  {
    title: "Messaging",
    items: ["Kafka"],
  },
  {
    title: "DevOps & Tools",
    items: ["Docker", "Git", "GitHub", "GitLab CI/CD", "Linux"],
  },
  {
    title: "Architecture",
    items: ["Clean Architecture", "Hexagonal Architecture", "DDD", "Modular Monolith"],
  },
];
