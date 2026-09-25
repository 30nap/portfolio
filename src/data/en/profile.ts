import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Sina Pezeshki",
  latinName: "Sina Pezeshki",
  role: "Java Backend Developer",
  roleSubtitle: "Software Engineer",
  tagline:
    "Backend developer focused on building reliable, maintainable and scalable Java applications.",
  highlights: [
    "5+ years of professional experience",
    "Enterprise & banking systems",
    "Java & Spring ecosystem",
  ],
  coreStack: ["Java", "Spring Boot", "Spring Security", "Spring Batch", "Hibernate / JPA", "Oracle", "PostgreSQL", "Kafka"],
  // Example: "Open to backend roles". Set to null to hide the badge.
  availability: null,
  // TODO(sina): optional, e.g. "Tehran, Iran" or "Open to relocation".
  location: "",
  about: [
    "I'm a software engineer with over five years of experience building backend and enterprise applications, most of it in banking. I work mainly in the Java ecosystem — Spring Boot, Spring Security, Spring Batch and JPA — on systems where correctness and reliability matter more than novelty.",
    "Day to day that means designing REST APIs, writing batch jobs, working with Oracle and PostgreSQL, and modernizing existing backends step by step without disrupting the services that depend on them.",
    "I care about code that stays understandable as it grows: explicit boundaries, deliberate architecture and tests that make change safe. Outside of work I explore Clean Architecture, Domain-Driven Design and distributed systems through my own projects.",
  ],
  focus: [
    "Java ecosystem & modern Java",
    "Spring and enterprise backend systems",
    "Software architecture",
    "Maintainability",
    "Reliability",
  ],
  resumeSummary:
    "Java Backend Developer with 5+ years of professional experience building enterprise and banking backend systems with Java, Spring Boot, Hibernate/JPA, Oracle and PostgreSQL. Experienced with REST APIs, batch processing and the incremental modernization of existing backends. Focused on maintainable architecture, clear domain boundaries and reliable services.",
};
