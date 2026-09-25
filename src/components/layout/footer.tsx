import { Container } from "@/components/ui/container";
import type { SocialLink } from "@/types/content";

interface FooterProps {
  name: string;
  role: string;
  links: SocialLink[];
  rights: string;
}

export function Footer({ name, role, links, rights }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10 print:hidden">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="mt-1 text-sm text-muted">{role}</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          {links.length > 0 ? (
            <ul className="flex gap-5">
              {links.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-xs text-subtle">
            © {year} {name}. {rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
