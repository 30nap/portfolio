import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/features/contact/contact-form";
import type { SocialLink, SocialPlatform, UiDictionary } from "@/types/content";

interface ContactSectionProps {
  email: string | null;
  socialLinks: SocialLink[];
  formEndpoint: string | null;
  ui: UiDictionary;
}

const icons: Record<SocialPlatform, typeof GitHubIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function ContactSection({ email, socialLinks, formEndpoint, ui }: ContactSectionProps) {
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

  return (
    <Section id="contact" eyebrow={labels.eyebrow} title={labels.title} description={labels.description}>
      <div className={showForm ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16" : undefined}>
        <ul className="divide-y divide-border border-y border-border self-start">
          {channels.map(({ key, label, value, href, Icon }) => {
            const external = !href.startsWith("mailto:");
            return (
              <li key={key}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
                  className="group flex items-center gap-4 py-4 transition-colors"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition-colors group-hover:text-foreground">
                    <Icon width={16} height={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-subtle">{label}</span>
                    <span className="block truncate text-[15px] font-medium group-hover:underline group-hover:underline-offset-4">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        {showForm ? (
          <div className="rounded-xl border border-border p-6 sm:p-8">
            <ContactForm endpoint={formEndpoint} email={email} labels={ui.contact} />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
