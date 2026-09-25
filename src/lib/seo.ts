import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getContent, getEmail, getSocialLinks } from "@/lib/content";
import { defaultLocale, localeConfig } from "@/lib/i18n";

interface PageMetadataOptions {
  /** Page title without the site suffix. Omit for the home page. */
  title?: string;
  description?: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  noIndex?: boolean;
}

/** Per-page metadata. OpenGraph/Twitter images come from app/opengraph-image.tsx. */
export function buildMetadata({ title, description, path, noIndex }: PageMetadataOptions): Metadata {
  const resolvedTitle = title ? `${title} | ${getContent().profile.name}` : siteConfig.seo.title;
  const resolvedDescription = description ?? siteConfig.seo.description;

  return {
    title: title ? title : { absolute: siteConfig.seo.title },
    description: resolvedDescription,
    alternates: { canonical: path },
    // Nested objects replace the layout's values, so the full objects are set here.
    openGraph: {
      type: "website",
      siteName: getContent().profile.name,
      locale: localeConfig[defaultLocale].ogLocale,
      title: resolvedTitle,
      description: resolvedDescription,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(siteConfig.seo.twitterHandle ? { creator: siteConfig.seo.twitterHandle } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Schema.org ProfilePage + Person, rendered on the home and resume pages. */
export function buildPersonJsonLd(path: string) {
  const { profile, skills, education, experience, companies } = getContent();
  const email = getEmail();
  const current = experience.find((item) => item.end === null);
  const currentCompany = current && companies.find((company) => company.id === current.companyId);

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${siteConfig.url}${path}`,
    inLanguage: localeConfig[defaultLocale].lang,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      description: profile.tagline,
      url: siteConfig.url,
      ...(email ? { email: `mailto:${email}` } : {}),
      sameAs: getSocialLinks().map((link) => link.url),
      knowsAbout: skills.flatMap((group) => group.items),
      ...(currentCompany
        ? { worksFor: { "@type": "Organization", name: currentCompany.name } }
        : {}),
      alumniOf: education.map((item) => ({
        "@type": "CollegeOrUniversity",
        name: item.institution,
      })),
    },
  };
}
