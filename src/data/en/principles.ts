import type { Principle } from "@/types/content";

/** "How I Build Software" section. */
export const principles: Principle[] = [
  {
    title: "Clear domain boundaries",
    description:
      "Business rules live in the domain, separated from frameworks, persistence and transport, so each part can change on its own.",
  },
  {
    title: "Maintainable code",
    description:
      "Readable, consistent code with small, focused units. The next developer — often me — should understand it without a walkthrough.",
  },
  {
    title: "Explicit architecture",
    description:
      "Dependencies, module boundaries and trade-offs are visible in the structure of the code, not only in someone's head.",
  },
  {
    title: "Testability",
    description:
      "Designs that are easy to test in isolation, backed by integration tests where the real risk is in the wiring.",
  },
  {
    title: "Reliable backend systems",
    description:
      "Predictable failure handling, data integrity enforced where it belongs, and behaviour that is observable in production.",
  },
  {
    title: "Incremental modernization",
    description:
      "Legacy systems are improved step by step, keeping them running and releasable instead of betting on a big rewrite.",
  },
];
