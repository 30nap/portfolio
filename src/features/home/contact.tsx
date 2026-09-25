import type { ReactElement } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRightIcon, DownloadIcon, FileIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/features/contact/contact-form";
import type { SocialLink, SocialPlatform, UiDictionary } from "@/types/content";

interface ContactSectionProps {
  email: string | null;
  socialLinks: SocialLink[];
  formEndpoint: string | null;
  resumePdfUrl: string | null;
  resumeDownloadName: string;
  ui: UiDictionary;
}

const icons: Record<SocialPlatform, typeof GitHubIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

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
    ...(email ? [{ key: "email", label: ui.contact.email, value: email, href: `mailto:${email}`, Icon: MailIcon }] : []),
    ...socialLinks.map((link) => ({
      key: link.platform,
      label: link.label,
      value: link.handle ? `@${link.handle}` : displayUrl(link.url),
      href: link.url,
      Icon: icons[link.platform],
    })),
  ];

  const channelList: ReactElement = (
    <ul className="grid content-start gap-3">
      {channels.map(({ key, label, value, href, Icon }) => {
        const external = !href.startsWith("mailto:");
        return (
          <li key={key}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
              className="card card-hover group flex items-center gap-4 p-4"
            >
              <span className="icon-badge size-11">
                <Icon width={18} height={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-subtle">{label}</span>
                <span className="block truncate text-[15px] font-semibold transition-colors group-hover:text-accent">
                  {/* Emails, handles and URLs are LTR; the inline span keeps the line aligned to the start. */}
                  <span dir="ltr">{value}</span>
                </span>
              </span>
              <ArrowUpRightIcon className="text-subtle transition-colors group-hover:text-accent" />
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Section id="contact" icon="mail" eyebrow={labels.eyebrow} title={labels.title} description={labels.description}>
      <div className="reveal relative isolate overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
        <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h3 className="text-2xl leading-10 font-extrabold text-balance sm:text-3xl sm:leading-[1.4]">
              {ui.contact.ctaTitle}
            </h3>
            <p className="mt-4 max-w-md leading-8 text-muted">{ui.contact.ctaBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {resumePdfUrl ? (
                <ButtonLink href={resumePdfUrl} download={resumeDownloadName}>
                  <DownloadIcon />
                  {ui.hero.downloadResume}
                </ButtonLink>
              ) : (
                <ButtonLink href="/resume">
                  <FileIcon />
                  {ui.hero.viewResume}
                </ButtonLink>
              )}
            </div>
            {showForm ? <div className="mt-8">{channelList}</div> : null}
          </div>

          {showForm ? (
            <div className="card p-6 sm:p-8">
              <ContactForm endpoint={formEndpoint} email={email} labels={ui.contact} />
            </div>
          ) : (
            channelList
          )}
        </div>
      </div>
    </Section>
  );
}
