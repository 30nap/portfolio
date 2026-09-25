import type { Company } from "@/types/content";

/**
 * Companies are referenced from `experience` by `id`.
 * TODO(sina): add company websites if you want them linked.
 */
export const companies: Company[] = [
  { id: "caspian", name: "Caspian", url: "", industry: "Enterprise & banking systems" },
  { id: "dotin", name: "Dotin", url: "", industry: "Banking software" },
  { id: "tarsim", name: "Tarsim", url: "", industry: "Software development" },
];
