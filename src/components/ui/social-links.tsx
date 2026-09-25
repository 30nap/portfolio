import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { SocialLink, SocialPlatform } from "@/types/content";

const icons: Record<SocialPlatform, typeof GitHubIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

interface SocialLinksProps {
  links: SocialLink[];
  email?: string | null;
  emailLabel?: string;
  className?: string;
}

/** Icon-only links. Each link has an accessible name. */
export function SocialLinks({ links, email, emailLabel = "Email", className }: SocialLinksProps) {
  const itemClass =
    "inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground";

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => {
        const Icon = icons[link.platform];
        return (
          <li key={link.platform}>
            <a href={link.url} target="_blank" rel="noopener noreferrer me" className={itemClass} aria-label={link.label}>
              <Icon width={18} height={18} />
            </a>
          </li>
        );
      })}
      {email ? (
        <li>
          <a href={`mailto:${email}`} className={itemClass} aria-label={emailLabel}>
            <MailIcon width={18} height={18} />
          </a>
        </li>
      ) : null}
    </ul>
  );
}
