import type { SiteContent } from "@/types/content";
import { companies } from "./companies";
import { education } from "./education";
import { experience } from "./experience";
import { navigation } from "./navigation";
import { principles } from "./principles";
import { profile } from "./profile";
import { projects } from "./projects";
import { seo } from "./seo";
import { skills } from "./skills";
import { ui } from "./ui";

export const fa: SiteContent = {
  seo,
  profile,
  navigation,
  companies,
  experience,
  projects,
  skills,
  principles,
  education,
  ui,
};
