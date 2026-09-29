import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, DownloadIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/features/contact/contact-form";
import type { SocialLink, UiDictionary } from "@/types/content";

interface ContactSectionProps {
  email: string | null;
  socialLinks: SocialLink[];
  formEndpoint: string | null;
  resumePdfUrl: string | null;
  resumeDownloadName: string;
  ui: UiDictionary;
}

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function ContactSection({
  email,
  socialLinks,
  formEndpoint,
  resumePdfUrl,
  resumeDownloadName,
  ui,
}: ContactSectionProps) {
  const labels = ui.sections.contact;
  const showForm = Boolean(formEndpoint || email);

  const channels = [
    ...(email ? [{ key: "email", label: ui.contact.email, value: email, href: `mailto:${email}` }] : []),
    ...socialLinks.map((link) => ({ key: link.platform, label: link.label, value: displayUrl(link.url), href: link.url })),
  ];

  return (
    <Section id="contact" title={labels.title}>
      <h3 className="max-w-[22ch] text-3xl leading-snug font-black text-balance sm:text-4xl sm:leading-snug">
        {ui.contact.ctaTitle}
      </h3>
      <p className="mt-4 max-w-[56ch] text-base leading-8 text-muted sm:text-lg">{labels.description}</p>

      {channels.length > 0 ? (
        <ul className="mt-10 max-w-3xl border-y border-border">
          {channels.map(({ key, label, value, href }) => {
            const external = !href.startsWith("mailto:");
            return (
              <li key={key} className="border-t border-border first:border-t-0">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
                >
                  <span className="text-sm text-muted">{label}</span>
                  <span className="inline-flex items-center gap-2 text-xl font-extrabold transition-colors group-hover:text-accent sm:text-2xl">
                    {/* Emails and URLs are LTR. */}
                    <span dir="ltr">{value}</span>
                    {external ? <ArrowUpRightIcon width={18} height={18} className="text-accent" /> : null}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-8">
        {resumePdfUrl ? (
          <ButtonLink href={resumePdfUrl} download={resumeDownloadName}>
            <DownloadIcon />
            {ui.hero.downloadResume}
          </ButtonLink>
        ) : (
          <ButtonLink href="/resume">{ui.hero.viewResume}</ButtonLink>
        )}
      </div>

      {showForm ? (
        <div className="card mt-14 max-w-3xl p-6 sm:p-8">
          <ContactForm endpoint={formEndpoint} email={email} labels={ui.contact} />
        </div>
      ) : null}
    </Section>
  );
}
