import { Section } from "@/components/ui/section";
import { formatEducationDates } from "@/lib/content";
import type { Education, UiDictionary } from "@/types/content";

export function EducationSection({ items, ui }: { items: Education[]; ui: UiDictionary }) {
  return (
    <Section id="education" title={ui.sections.education.title}>
      <ul>
        {items.map((item) => {
          const dates = formatEducationDates(item, ui);
          return (
            <li
              key={`${item.institution}-${item.degree}`}
              className="grid gap-x-10 gap-y-3 border-t border-border py-8 first:border-t-0 first:pt-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
            >
              {dates ? (
                <p className="text-sm text-muted tabular-nums sm:pt-1.5">{dates}</p>
              ) : (
                <span aria-hidden="true" className="hidden sm:block" />
              )}
              <div>
                <h3 className="text-xl font-extrabold sm:text-2xl">{item.degree}</h3>
                <p className="mt-1 text-[15px] text-muted">{item.institution}</p>
                {item.details?.map((detail) => (
                  <p key={detail} className="mt-2 text-sm text-muted">
                    {detail}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
