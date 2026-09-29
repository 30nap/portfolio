import { Section } from "@/components/ui/section";
import { TechList } from "@/components/ui/tag";
import { formatDateRange, type ExperienceWithCompany } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { UiDictionary } from "@/types/content";

/** Ledger entries: the date in its own column, the role and what it involved beside it. */
export function ExperienceSection({ items, ui }: { items: ExperienceWithCompany[]; ui: UiDictionary }) {
  return (
    <Section id="experience" title={ui.sections.experience.title}>
      <ol>
        {items.map((item) => {
          const isCurrent = item.end === null;
          return (
            <li
              key={`${item.companyId}-${item.start}`}
              id={`experience-${item.companyId}`}
              className="grid scroll-mt-24 gap-x-10 gap-y-3 border-t border-border py-9 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
            >
              <p className={cn("text-sm tabular-nums sm:pt-1.5", isCurrent ? "font-bold text-accent" : "text-muted")}>
                {isCurrent ? <span aria-hidden="true" className="me-2 inline-block size-2 rounded-full bg-accent" /> : null}
                {formatDateRange(item.start, item.end, ui)}
              </p>

              <article>
                <h3 className="text-xl font-extrabold sm:text-2xl">{item.title}</h3>
                <p className="mt-1 text-[15px] text-muted">
                  {item.company.url ? (
                    <a
                      href={item.company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      dir="ltr"
                      className="font-bold text-foreground underline decoration-accent/50 underline-offset-4 hover:decoration-accent"
                    >
                      {item.company.name}
                    </a>
                  ) : (
                    <span dir="ltr" className="font-bold text-foreground">
                      {item.company.name}
                    </span>
                  )}
                  {item.company.industry ? <span>{ui.listSeparator}{item.company.industry}</span> : null}
                </p>

                {item.summary ? <p className="mt-5 max-w-[62ch] text-base leading-8">{item.summary}</p> : null}

                {item.highlights.length > 0 ? (
                  <ul className="mt-3 max-w-[62ch] space-y-1.5 text-[15px] leading-8 text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span aria-hidden="true" className="mt-4 h-px w-3 shrink-0 bg-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.technologies.length > 0 ? (
                  <TechList items={item.technologies} className="mt-5" />
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
