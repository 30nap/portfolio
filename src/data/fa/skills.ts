import type { SkillGroup } from "@/types/content";

/** عنوان گروه‌ها فارسی و نام فناوری‌ها انگلیسی. بدون درصد. */
export const skills: SkillGroup[] = [
  {
    icon: "server",
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "Spring Batch", "Hibernate", "JPA", "REST API"],
  },
  {
    icon: "database",
    title: "پایگاه داده و ذخیره‌سازی",
    items: ["Oracle", "PostgreSQL", "Redis"],
  },
  {
    icon: "message",
    title: "پیام‌رسانی",
    items: ["Kafka"],
  },
  {
    icon: "tools",
    title: "ابزارها و DevOps",
    items: ["Docker", "Git", "GitHub", "GitLab CI/CD", "Linux"],
  },
  {
    icon: "layers",
    title: "معماری نرم‌افزار",
    items: ["Clean Architecture", "Hexagonal Architecture", "DDD", "Modular Monolith"],
  },
];
