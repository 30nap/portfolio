import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowUpIcon } from "@/components/ui/icons";
import { contentColumnClass, ledgerGridClass, marginColumnClass } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { localizeDigits } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { NavItem, SocialLink, UiDictionary } from "@/types/content";

interface FooterProps {
  name: string;
  role: string;
  links: SocialLink[];
  navigation: NavItem[];
  ui: UiDictionary;
}

/** Closes the ledger: the margin column and its red rule run down into the footer. */
export function Footer({ name, role, links, navigation, ui }: FooterProps) {
  const year = localizeDigits(new Date().getFullYear(), ui.digits);

  return (
    <footer className="border-t border-border bg-surface print:hidden">
      <Container className={ledgerGridClass}>
        <div className={cn("pt-10 lg:py-12", marginColumnClass)}>
          <p className="font-extrabold">{name}</p>
          <p className="mt-0.5 text-sm text-muted">{role}</p>
        </div>

        <div className={cn("pt-6 pb-10 lg:py-12", contentColumnClass)}>
          <nav aria-label={ui.nav.primary}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-subtle">
              © {year} {name}. {ui.footer.rights}
            </p>
            <div className="flex items-center gap-2">
              <SocialLinks links={links} />
              <a
                href="#main"
                className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs font-semibold text-muted transition-colors hover:text-foreground"
              >
                <ArrowUpIcon width={14} height={14} />
                {ui.footer.backToTop}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
