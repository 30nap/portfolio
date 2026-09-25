import { CalendarIcon, GraduationIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { formatEducationDates } from "@/lib/content";
import type { Education, UiDictionary } from "@/types/content";

export function EducationSection({ items, ui }: { items: Education[]; ui: UiDictionary }) {
  const labels = ui.sections.education;

  return (
    <Section id="education" icon="graduation" tone="muted" eyebrow={labels.eyebrow} title={labels.title}>
      <ul className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => {
          const dates = formatEducationDates(item, ui);
          return (
            <li key={`${item.institution}-${item.degree}`} className="reveal card card-hover flex items-start gap-5 p-6 sm:p-7">
              <span className="icon-badge size-14 rounded-2xl">
                <GraduationIcon width={26} height={26} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold">{item.degree}</h3>
                <p className="mt-1 text-[15px] text-muted">{item.institution}</p>
                {item.details?.map((detail) => (
                  <p key={detail} className="mt-2 text-sm text-muted">
                    {detail}
                  </p>
                ))}
                {dates ? (
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    <CalendarIcon width={13} height={13} />
                    {dates}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
