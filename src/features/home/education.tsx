import { Section } from "@/components/ui/section";
import { formatEducationDates } from "@/lib/content";
import type { Education, UiDictionary } from "@/types/content";

export function EducationSection({ items, ui }: { items: Education[]; ui: UiDictionary }) {
  const labels = ui.sections.education;

  return (
    <Section id="education" eyebrow={labels.eyebrow} title={labels.title}>
      <ul className="space-y-8">
        {items.map((item) => {
          const dates = formatEducationDates(item, ui.education);
          return (
            <li
              key={`${item.institution}-${item.degree}`}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <div>
                <h3 className="text-base font-semibold tracking-tight">{item.degree}</h3>
                <p className="mt-1 text-sm text-muted">{item.institution}</p>
                {item.details?.map((detail) => (
                  <p key={detail} className="mt-2 text-sm text-muted">
                    {detail}
                  </p>
                ))}
              </div>
              {dates ? <p className="font-mono text-sm text-subtle">{dates}</p> : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
