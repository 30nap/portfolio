import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/social-links";
import { localizeDigits } from "@/lib/i18n";
import type { NavItem, SocialLink, UiDictionary } from "@/types/content";

interface FooterProps {
  name: string;
  role: string;
  links: SocialLink[];
  navigation: NavItem[];
  ui: UiDictionary;
}

export function Footer({ name, role, links, navigation, ui }: FooterProps) {
  const year = localizeDigits(new Date().getFullYear(), ui.digits);

  return (
    <footer className="relative border-t border-border bg-surface/60 print:hidden">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-lg font-black text-white"
            >
              {name.charAt(0)}
            </span>
            <div>
              <p className="font-bold">{name}</p>
              <p className="text-sm text-muted">{role}</p>
            </div>
          </div>

          <nav aria-label={ui.nav.primary}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-subtle">
            © {year} {name}. {ui.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <SocialLinks links={links} />
            <a
              href="#main"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted transition-colors hover:bg-accent/8 hover:text-accent"
            >
              <ArrowUpIcon width={14} height={14} />
              {ui.footer.backToTop}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
