import type { SocialLink } from "@/types/content";

/**
 * Social profiles. Links with an empty `url` are hidden everywhere
 * (hero, contact, footer, resume and structured data).
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    url: "https://github.com/30nap",
    handle: "30nap",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    // TODO(sina): add your LinkedIn profile URL, e.g. "https://www.linkedin.com/in/your-handle".
    url: "",
  },
];
