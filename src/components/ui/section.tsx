import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

/** Margin column of the ledger grid. On wide screens it carries the red double rule. */
export const marginColumnClass = "lg:border-e-[3px] lg:border-double lg:border-accent lg:pe-8";

/** Content column of the ledger grid. */
export const contentColumnClass = "min-w-0 lg:ps-12";

/** Two-column ledger grid shared by the hero and every section. */
export const ledgerGridClass = "grid lg:grid-cols-[var(--margin-col)_minmax(0,1fr)]";

/**
 * A page section laid out like a ledger page: the title sits in the margin column,
 * separated from the content by the red double rule. Headings are h2; items inside use h3.
 */
export function Section({ id, title, description, children, className }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-t border-border", className)}>
      <Container className={ledgerGridClass}>
        <div className={cn("pt-14 lg:py-20", marginColumnClass)}>
          <h2
            id={headingId}
            className="w-fit border-b-[3px] border-double border-accent pb-2 text-2xl leading-tight font-black text-balance lg:sticky lg:top-24 lg:w-auto lg:border-0 lg:pb-0"
          >
            {title}
          </h2>
        </div>
        <div className={cn("pt-8 pb-16 lg:pt-20 lg:pb-24", contentColumnClass)}>
          {description ? <p className="mb-10 max-w-[60ch] text-base leading-8 text-muted sm:text-lg">{description}</p> : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
