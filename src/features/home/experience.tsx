import { CalendarIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { TagList } from "@/components/ui/tag";
import { formatDateRange, type ExperienceWithCompany } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { UiDictionary } from "@/types/content";

export function ExperienceSection({ items, ui }: { items: ExperienceWithCompany[]; ui: UiDictionary }) {
  const labels = ui.sections.experience;

  return (
    <Section id="experience" icon="briefcase" tone="muted" eyebrow={labels.eyebrow} title={labels.title}>
      <ol className="relative space-y-6 ps-8 sm:ps-12">
        {/* Timeline rail */}
        <span
          aria-hidden="true"
          className="absolute top-3 bottom-3 start-[11px] w-px bg-gradient-to-b from-accent/70 via-border-strong to-transparent sm:start-[19px]"
        />

        {items.map((item) => {
          const isCurrent = item.end === null;
          return (
            <li key={`${item.companyId}-${item.start}`} className="reveal relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-8 -start-[27px] size-3 rounded-full ring-4 ring-background sm:-start-[35px]",
                  isCurrent ? "bg-accent shadow-[0_0_0_6px_color-mix(in_srgb,var(--accent)_20%,transparent)]" : "bg-border-strong",
                )}
              />

              <article className={cn("card card-hover p-6 sm:p-7", isCurrent && "border-accent/35")}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl text-base font-black sm:size-12 sm:text-lg",
                        isCurrent
                          ? "bg-gradient-to-br from-accent to-accent-2 text-white shadow-md shadow-accent/25"
                          : "bg-surface text-muted ring-1 ring-border",
                      )}
                    >
                      {item.company.name.charAt(0)}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold sm:text-xl">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {item.company.url ? (
                          <a
                            href={item.company.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-foreground underline decoration-border-strong underline-offset-4 hover:decoration-accent"
                          >
                            {item.company.name}
                          </a>
                        ) : (
                          <span className="font-semibold text-foreground">{item.company.name}</span>
                        )}
                        {item.company.industry ? <span> · {item.company.industry}</span> : null}
                      </p>
                    </div>
                  </div>

                  <p
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                      isCurrent ? "border-accent/30 bg-accent/10 text-accent" : "border-border bg-surface text-muted",
                    )}
                  >
                    <CalendarIcon width={13} height={13} />
                    {formatDateRange(item.start, item.end, ui)}
                  </p>
                </div>

                {item.summary ? <p className="mt-5 text-[15px] leading-7 text-foreground/85">{item.summary}</p> : null}

                {item.highlights.length > 0 ? (
                  <ul className="mt-4 space-y-2 text-[15px] leading-7 text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent/70" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <TagList items={item.technologies} className="mt-6" />
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
