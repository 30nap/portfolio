import { en } from "@/data/en";
import { fa } from "@/data/fa";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";
import { defaultLocale, fixRtlPunctuation, localizeDigits, mapStrings } from "@/lib/i18n";
import type {
  CaseStudy,
  Company,
  Education,
  Experience,
  Locale,
  Project,
  SiteContent,
  SocialLink,
  UiDictionary,
} from "@/types/content";

const content: Record<Locale, SiteContent> = {
  fa: mapStrings(fa, fixRtlPunctuation),
  en,
};

export function getContent(locale: Locale = defaultLocale): SiteContent {
  return content[locale];
}

/** Social links that have a URL configured. */
export function getSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.url.trim() !== "");
}

export function getEmail(): string | null {
  return siteConfig.email.trim() || null;
}

export function getResumePdfUrl(): string | null {
  return siteConfig.resume.pdfUrl.trim() || null;
}

export function getCompany(companies: Company[], id: string): Company | undefined {
  return companies.find((company) => company.id === id);
}

export interface ExperienceWithCompany extends Experience {
  company: Company;
}

export function getExperienceWithCompanies({
  experience,
  companies,
}: Pick<SiteContent, "experience" | "companies">): ExperienceWithCompany[] {
  return experience.map((item) => {
    const company = getCompany(companies, item.companyId);
    if (!company) {
      throw new Error(`Unknown companyId "${item.companyId}" in experience data.`);
    }
    return { ...item, company };
  });
}

export function formatDateRange(start: string, end: string | null, ui: UiDictionary): string {
  return localizeDigits(`${start} – ${end ?? ui.experience.present}`, ui.digits);
}

export function getProject(projects: Project[], slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function hasCaseStudyContent(caseStudy: CaseStudy | undefined): boolean {
  if (!caseStudy) return false;
  return Object.entries(caseStudy).some(
    ([key, value]) =>
      key !== "technologies" && Array.isArray(value) && value.some((entry) => entry.trim() !== ""),
  );
}

/** "2021 – Expected 2027", "In progress", "2019 – 2023" or "" when no dates are set. */
export function formatEducationDates(item: Education, ui: UiDictionary): string {
  const labels = ui.education;
  const end = item.inProgress
    ? item.end
      ? labels.expected.replace("{year}", item.end)
      : labels.inProgress
    : item.end;
  return localizeDigits([item.start, end].filter(Boolean).join(" – "), ui.digits);
}
