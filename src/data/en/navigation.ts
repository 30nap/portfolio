import type { NavItem } from "@/types/content";

/** Links are absolute ("/#about") so they also work from /resume and case study pages. */
export const navigation: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];
