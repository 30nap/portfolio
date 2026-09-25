import type { NavItem } from "@/types/content";

/** لینک‌ها مطلق هستند ("/#about") تا از صفحه رزومه و صفحه پروژه‌ها هم کار کنند. */
export const navigation: NavItem[] = [
  { label: "درباره من", href: "/#about" },
  { label: "سوابق کاری", href: "/#experience" },
  { label: "پروژه‌ها", href: "/#projects" },
  { label: "مهارت‌های فنی", href: "/#skills" },
  { label: "رزومه", href: "/resume" },
  { label: "ارتباط با من", href: "/#contact" },
];
