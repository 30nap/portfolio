import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DownloadIcon } from "@/components/ui/icons";
import { PrintButton } from "@/features/resume/print-button";
import { formatDateRange, formatEducationDates, type ExperienceWithCompany } from "@/lib/content";
import type { SiteContent, SocialLink } from "@/types/content";

interface ResumeViewProps {
  content: SiteContent;
  experience: ExperienceWithCompany[];
  socialLinks: SocialLink[];
  email: string | null;
  siteUrl: string;
  pdfUrl: string | null;
  pdfDownloadName: string;
}

function ResumeSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-8 print:py-4 break-inside-avoid-page">
      <h2 id={id} className="eyebrow">
        {title}
      </h2>
      <div className="mt-5 print:mt-3">{children}</div>
    </section>
  );
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function ResumeView({ content, experience, socialLinks, email, siteUrl, pdfUrl, pdfDownloadName }: ResumeViewProps) {
  const { profile, ui, skills, projects, education } = content;
  const labels = ui.resume;

  const contactItems = [
    ...(email ? [{ label: email, href: `mailto:${email}` }] : []),
    ...socialLinks.map((link) => ({ label: stripProtocol(link.url), href: link.url })),
    ...(siteUrl.startsWith("https://") ? [{ label: stripProtocol(siteUrl), href: siteUrl }] : []),
  ];

  return (
    <Container size="narrow" className="py-14 sm:py-20 print:max-w-none print:px-0 print:py-0">
      <div className="mb-10 flex flex-wrap gap-3 print:hidden">
        {pdfUrl ? (
          <ButtonLink href={pdfUrl} download={pdfDownloadName}>
            <DownloadIcon />
            {labels.downloadPdf}
          </ButtonLink>
        ) : null}
        <PrintButton label={labels.print} />
      </div>

      <article>
        <header className="pb-8 print:pb-4">
          <p className="eyebrow print:hidden">
            {labels.title}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl print:mt-0 print:text-3xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted">{profile.role}</p>
          {profile.roleSubtitle ? (
            <p className="mt-1 text-sm text-subtle">
              <span dir="ltr" lang="en">
                {profile.roleSubtitle}
              </span>
            </p>
          ) : null}

          <address className="mt-5 not-italic">
            <h2 className="sr-only">{labels.contact}</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
              {profile.location ? <li>{profile.location}</li> : null}
              {contactItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    dir="ltr"
                    className="underline decoration-border-strong underline-offset-4 hover:text-foreground hover:decoration-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </header>

        <ResumeSection id="resume-summary" title={labels.summary}>
          <p className="leading-7 text-foreground/90">{profile.resumeSummary}</p>
        </ResumeSection>

        <ResumeSection id="resume-experience" title={labels.experience}>
          <ol className="space-y-8 print:space-y-5">
            {experience.map((item) => (
              <li key={`${item.companyId}-${item.start}`} className="break-inside-avoid">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:justify-between">
                  <h3 className="font-semibold">
                    {item.title} <span className="font-normal text-muted">· {item.company.name}</span>
                  </h3>
                  <p className="shrink-0 text-sm text-subtle">
                    {formatDateRange(item.start, item.end, ui)}
                  </p>
                </div>
                {item.summary ? <p className="mt-1 text-sm text-muted">{item.summary}</p> : null}
                {item.highlights.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-1 ps-5 text-[15px] leading-7 text-foreground/85 marker:text-subtle print:text-sm print:leading-6">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
                {item.technologies.length > 0 ? (
                  <p className="mt-2 text-sm text-muted">{item.technologies.join(" · ")}</p>
                ) : null}
              </li>
            ))}
          </ol>
        </ResumeSection>

        <ResumeSection id="resume-skills" title={labels.skills}>
          <dl className="grid gap-x-6 gap-y-2.5 text-[15px] sm:grid-cols-[160px_minmax(0,1fr)] print:grid-cols-[140px_minmax(0,1fr)] print:text-sm">
            {skills.map((group) => (
              <div key={group.title} className="contents">
                <dt className="font-medium">{group.title}</dt>
                <dd className="mb-2 text-foreground/85 sm:mb-0">
                  {/* Technology names read left to right, separated by a Latin comma. */}
                  <span dir="ltr">{group.items.join(", ")}</span>
                </dd>
              </div>
            ))}
          </dl>
        </ResumeSection>

        <ResumeSection id="resume-projects" title={labels.projects}>
          <ul className="space-y-5">
            {projects.map((project) => (
              <li key={project.slug} className="break-inside-avoid">
                <h3 className="font-semibold">
                  {project.name}
                  {project.links.github ? (
                    // The margin sits on the wrapper: logical margins on a dir="ltr" element resolve to its own direction.
                    <span className="ms-2">
                      <a
                        href={project.links.github}
                        dir="ltr"
                        className="text-sm font-normal text-muted underline decoration-border-strong underline-offset-4 hover:text-foreground"
                      >
                        {stripProtocol(project.links.github)}
                      </a>
                    </span>
                  ) : null}
                </h3>
                <p className="mt-1 text-[15px] leading-7 text-foreground/85 print:text-sm print:leading-6">{project.summary}</p>
                <p className="mt-1 text-sm text-muted">{project.techStack.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </ResumeSection>

        <ResumeSection id="resume-education" title={labels.education}>
          <ul className="space-y-4">
            {education.map((item) => {
              const dates = formatEducationDates(item, ui);
              return (
                <li
                  key={`${item.institution}-${item.degree}`}
                  className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 print:flex-row print:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{item.degree}</h3>
                    <p className="text-sm text-muted">{item.institution}</p>
                  </div>
                  {dates ? <p className="shrink-0 text-sm text-subtle">{dates}</p> : null}
                </li>
              );
            })}
          </ul>
        </ResumeSection>
      </article>
    </Container>
  );
}
