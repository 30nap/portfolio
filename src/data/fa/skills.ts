import type { SkillGroup } from "@/types/content";

/** عنوان گروه‌ها فارسی و نام فناوری‌ها انگلیسی. بدون درصد. */
export const skills: SkillGroup[] = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring Security", "Spring Batch", "Hibernate", "JPA", "REST API"],
  },
  {
    title: "پایگاه داده و ذخیره‌سازی",
    items: ["Oracle", "PostgreSQL", "Redis"],
  },
  {
    title: "پیام‌رسانی",
    items: ["Kafka"],
  },
  {
    title: "ابزارها و DevOps",
    items: ["Docker", "Git", "GitHub", "GitLab CI/CD", "Linux"],
  },
  {
    title: "معماری نرم‌افزار",
    items: ["Clean Architecture", "Hexagonal Architecture", "DDD", "Modular Monolith"],
  },
];
