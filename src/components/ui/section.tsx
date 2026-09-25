import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** A page section with a labelled heading. Headings are h2; items inside use h3. */
export function Section({ id, eyebrow, title, description, children, className }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-t border-border py-20 sm:py-28", className)}>
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
        </div>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}
