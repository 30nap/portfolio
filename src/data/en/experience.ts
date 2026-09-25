import type { Experience } from "@/types/content";

/**
 * Newest first. Keep highlights factual — add numbers only when you can back them up.
 * TODO(sina): refine highlights and technologies with the details of each role.
 */
export const experience: Experience[] = [
  {
    companyId: "caspian",
    title: "Java Backend Developer",
    start: "2025",
    end: null,
    summary: "Backend development for enterprise and banking systems.",
    highlights: [
      "Develop and maintain backend services for enterprise and banking systems with Java and Spring Boot.",
      "Contribute to the modernization of existing backend systems.",
      "Build and maintain batch processing workflows.",
      "Develop internal backend services used by other teams and systems.",
    ],
    technologies: ["Java", "Spring Boot"],
  },
  {
    companyId: "dotin",
    title: "Java Developer",
    start: "2022",
    end: "2025",
    summary: "Java backend development for banking software.",
    highlights: [
      "Developed backend features for banking software in Java.",
      "Designed and implemented REST services.",
      "Worked on enterprise applications as part of a larger engineering organization.",
    ],
    technologies: ["Java", "REST APIs"],
  },
  {
    companyId: "tarsim",
    title: "Java Developer",
    start: "2021",
    end: "2022",
    summary: "Started as an intern and continued as a software developer.",
    highlights: [
      "Joined as an intern and moved into a software developer role.",
      "Developed and maintained Java applications.",
    ],
    technologies: ["Java"],
  },
];
