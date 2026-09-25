import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { formatDateRange, type ExperienceWithCompany } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { UiDictionary } from "@/types/content";

export function ExperienceSection({ items, ui }: { items: ExperienceWithCompany[]; ui: UiDictionary }) {
  const labels = ui.sections.experience;

  return (
    <Section id="experience" eyebrow={labels.eyebrow} title={labels.title}>
      <ol className="relative">
        {items.map((item, index) => {
          const isCurrent = item.end === null;
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.companyId}-${item.start}`}
              className="relative grid gap-3 ps-8 pb-14 last:pb-0 md:grid-cols-[140px_minmax(0,1fr)] md:gap-12 md:ps-0"
            >
              {/* Timeline rail and marker */}
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute top-3 bottom-0 start-[5px] w-px bg-border md:start-[164px]"
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-[7px] start-0 size-[11px] rounded-full border-2 md:start-[158.5px]",
                  isCurrent ? "border-accent bg-accent/20" : "border-border-strong bg-background",
                )}
              />

              <p className="font-mono text-sm text-subtle rtl:font-sans md:pt-0.5 md:text-end">
                {formatDateRange(item.start, item.end, ui)}
              </p>

              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {item.title}
                  <span className="text-muted font-normal"> · </span>
                  {item.company.url ? (
                    <a
                      href={item.company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-border-strong underline-offset-4 hover:decoration-foreground"
                    >
                      {item.company.name}
                    </a>
                  ) : (
                    item.company.name
                  )}
                </h3>
                {item.company.industry || item.summary ? (
                  <p className="mt-1 text-sm text-muted">{item.summary || item.company.industry}</p>
                ) : null}

                {item.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-[15px] leading-7 text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-subtle" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <TagList items={item.technologies} className="mt-5" />
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
