/**
 * Locale-independent site settings.
 *
 * Fields marked `TODO(sina)` are intentionally empty. Empty values are hidden
 * by the UI, so nothing broken or fake is ever rendered.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  // Set automatically on Vercel production deployments.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteConfig = {
  /** Canonical origin. Configure with NEXT_PUBLIC_SITE_URL in production. */
  url: resolveSiteUrl(),

  /** Public contact email. TODO(sina): add your email to enable the email link and the contact form. */
  email: "",

  resume: {
    /**
     * Path or absolute URL of your PDF resume, e.g. "/resume/sina-resume.pdf"
     * for a file stored at public/resume/sina-resume.pdf.
     *
     * TODO(sina): add your PDF. While empty, the "Download Resume" buttons
     * link to the /resume page instead, which can be printed to PDF.
     */
    pdfUrl: "",
    /** File name suggested to the browser when downloading. */
    downloadName: "Sina-Java-Backend-Developer-Resume.pdf",
  },

  contactForm: {
    /**
     * Optional form endpoint that accepts a JSON POST with
     * { name, email, message } (Formspree, Basin, your own API, ...).
     * When empty, the form opens the visitor's email client instead.
     */
    endpoint: "",
  },

  seo: {
    title: "Sina | Java Backend Developer",
    description:
      "Java Backend Developer specializing in Spring Boot, enterprise backend systems and modern Java software architecture.",
    keywords: [
      "Java Backend Developer",
      "Spring Boot",
      "Spring Security",
      "Spring Batch",
      "Hibernate",
      "Backend Engineer",
      "Software Engineer",
      "Enterprise Software",
      "Banking Systems",
      "Software Architecture",
    ],
    /** Optional X/Twitter handle including "@". Empty string omits it. */
    twitterHandle: "",
  },
};
