import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/content";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  icon?: IconName;
  /** "muted" gives the section a tinted background to separate it from its neighbours. */
  tone?: "default" | "muted";
  children: ReactNode;
  className?: string;
}

/** A page section with a labelled heading. Headings are h2; items inside use h3. */
export function Section({ id, eyebrow, title, description, icon, tone = "default", children, className }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "relative py-20 sm:py-28",
        tone === "muted" && "border-y border-border bg-surface/60",
        className,
      )}
    >
      <Container>
        <div className="reveal max-w-2xl">
          <p className="eyebrow">
            {icon ? (
              <span className="icon-badge size-7 rounded-lg">
                <Icon name={icon} width={15} height={15} />
              </span>
            ) : null}
            {eyebrow}
          </p>
          <h2 id={headingId} className="mt-4 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description ? <p className="mt-4 text-base leading-8 text-muted sm:text-lg">{description}</p> : null}
        </div>
        <div className="mt-12 sm:mt-14">{children}</div>
      </Container>
    </section>
  );
}
