import type { Project } from "@/types/content";

/**
 * Projects, in display order.
 *
 * - Every project gets a page at /projects/{slug}.
 * - Links that are missing are not rendered.
 * - The "Case study" link appears only once `caseStudy` has at least one
 *   non-empty section. Empty sections are hidden; a page with no case study
 *   content shows a short notice and is excluded from search indexing.
 * - To add a screenshot, put the file in /public/projects and set `image`.
 */
export const projects: Project[] = [
  {
    slug: "lifeos",
    name: "LifeOS",
    summary: "A personal productivity and task management backend project.",
    techStack: ["Java", "Spring Boot", "Clean Architecture", "REST API"],
    // TODO(sina): confirm the status.
    status: "in-development",
    featured: true,
    links: {
      // TODO(sina): this repository is not publicly accessible at the moment.
      // Make it public, or remove the link so visitors do not hit a 404.
      github: "https://github.com/30nap/LifeOS",
    },
    // TODO(sina): add case study content (problem, architecture, decisions, ...).
    caseStudy: {},
  },
  {
    slug: "clinico",
    name: "Clinico",
    summary:
      "A small CRM for beauty clinics that reduces appointment no-shows with automated SMS reminders and one-tap confirmations. Built as a production-ready application: Spring Boot API, PostgreSQL, a React SPA and a single container image.",
    techStack: [
      "Java 21",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "PostgreSQL",
      "Flyway",
      "React",
      "TypeScript",
      "Docker",
    ],
    // TODO(sina): confirm the status.
    status: "in-development",
    featured: true,
    links: {
      github: "https://github.com/30nap/Clinico",
    },
    // Sourced from the Clinico README. TODO(sina): review the wording and add
    // "challenges" and "learnings" in your own words.
    caseStudy: {
      problem: [
        "Clinico is built around a single goal: cut appointment no-shows with automated SMS reminders that customers can confirm in one tap.",
      ],
      context: [
        "The product targets Iranian clinics: the UI is Persian and right-to-left, dates are shown on the Jalali calendar and every SMS is written for a local audience.",
        "It covers customers, a day and week appointment agenda, automatic reminders, a public self-confirmation page, a dashboard with the 30-day no-show rate, and a public landing page with a browser-only demo.",
      ],
      architecture: [
        "A React single-page application talks JSON over HTTP to a Spring Boot API backed by PostgreSQL. A scheduler runs the reminder sweep, and SMS delivery goes through a swappable SmsSender interface.",
        "The SPA is built into the backend jar, so the whole application ships as one container image.",
      ],
      decisions: [
        "UTC everywhere inside: the database, the entities and the JSON API use UTC instants. Conversion to Jalali dates and the clinic's time zone happens only at the edges.",
        "SMS is a side effect of a committed transaction: messages are sent from a transactional event listener after commit, so a provider outage can never roll back a booking.",
        "Correctness is enforced in the database: a unique constraint prevents duplicate messages and an exclusion constraint on the appointment time range prevents double booking. The application checks the same rules first only to return a readable error.",
        "The demo runs entirely in the browser against an in-memory store that mirrors the API contract, so a public demo never exposes real data or requires multi-tenancy.",
        "The production profile validates its own configuration and refuses to start with development defaults.",
      ],
      technologies: [
        "Java 21",
        "Spring Boot 3.5",
        "Spring Security",
        "Spring Data JPA",
        "Spring Session JDBC",
        "PostgreSQL 16",
        "Flyway",
        "React 19",
        "TypeScript",
        "Vite",
        "Docker",
        "GitHub Actions",
      ],
    },
  },
];
