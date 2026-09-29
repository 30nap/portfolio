import type { CSSProperties } from "react";
import { contentColumnClass, ledgerGridClass, marginColumnClass } from "@/components/ui/section";
import { formatDateRange, type ExperienceWithCompany } from "@/lib/content";
import { localizeDigits } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { UiDictionary } from "@/types/content";

/** First four-digit year in a free-form date string ("2025", "Mar 2025"). */
function toYear(value: string): number | null {
  const match = value.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

/** Stagger between spans, and how long each one takes to draw (matches globals.css). */
const STAGGER_MS = 380;
const DRAW_MS = 900;

/**
 * The career drawn as a trace waterfall: one span per role on a shared year axis,
 * oldest at the top. Time runs in the reading direction, so right to left in Persian.
 * Renders nothing if a date cannot be placed on the axis.
 */
export function CareerTrace({ items, ui, label }: { items: ExperienceWithCompany[]; ui: UiDictionary; label: string }) {
  // Rendered at build time for the static export, so "now" is the date of the last deploy.
  const today = new Date();
  const now = today.getFullYear() + today.getMonth() / 12;

  const spans = [...items].reverse().map((item) => {
    const start = toYear(item.start);
    const end = item.end === null ? now : toYear(item.end);
    return start === null || end === null ? null : { item, start, end: Math.max(end, start + 0.25) };
  });
  if (spans.length === 0 || spans.some((span) => span === null)) return null;
  const placed = spans as NonNullable<(typeof spans)[number]>[];

  const first = Math.min(...placed.map((span) => span.start));
  const last = Math.max(first + 1, Math.ceil(Math.max(...placed.map((span) => span.end))));
  const years = last - first;
  const toPercent = (value: number) => ((value - first) / years) * 100;
  const trackStyle = { "--years": years } as CSSProperties;

  return (
    <div>
      {/* Year ruler */}
      <div aria-hidden="true" className={ledgerGridClass}>
        <div className={marginColumnClass} />
        <div className={contentColumnClass}>
          <div
            className="trace-track grid text-xs text-subtle tabular-nums"
            style={{ ...trackStyle, gridTemplateColumns: `repeat(${years}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: years }, (_, index) => (
              <span key={index} className="px-1.5 pt-3 pb-1.5 sm:px-2 sm:pt-6 sm:pb-2">
                {localizeDigits(first + index, ui.digits)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol aria-label={label}>
        {placed.map(({ item, start, end }, index) => {
          const isCurrent = item.end === null;
          const delay = 250 + index * STAGGER_MS;
          const from = toPercent(start);
          const to = toPercent(end);

          return (
            <li key={`${item.companyId}-${item.start}`} className={cn(ledgerGridClass, "group border-t border-border")}>
              <div className={cn("pt-3 pb-1 lg:py-4", marginColumnClass)}>
                <a
                  href={`#experience-${item.companyId}`}
                  className="block rounded-sm outline-offset-4"
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span dir="ltr" className="font-extrabold transition-colors group-hover:text-accent">
                      {item.company.name}
                    </span>
                    <span className={cn("text-xs tabular-nums", isCurrent ? "font-bold text-accent" : "text-subtle")}>
                      {formatDateRange(item.start, item.end, ui)}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-muted">{item.title}</span>
                </a>
              </div>

              <div className={cn("pb-2 lg:pb-0", contentColumnClass)}>
                <div aria-hidden="true" className="trace-track relative h-7 lg:h-full" style={trackStyle}>
                  <span
                    className={cn(
                      "trace-span absolute inset-y-0 my-auto h-3 rounded-[2px] transition-colors",
                      isCurrent ? "bg-accent" : "bg-foreground/75 group-hover:bg-foreground",
                    )}
                    style={{ insetInlineStart: `${from}%`, width: `${to - from}%`, "--delay": `${delay}ms` } as CSSProperties}
                  />
                  {isCurrent ? (
                    <span
                      className="trace-live absolute inset-y-0 my-auto size-3.5 rounded-full border-2 border-background bg-accent"
                      style={{ insetInlineStart: `calc(${to}% - 0.4375rem)`, "--delay": `${delay + DRAW_MS}ms` } as CSSProperties}
                    />
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
