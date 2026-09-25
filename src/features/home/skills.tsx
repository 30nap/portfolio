import { Section } from "@/components/ui/section";
import type { SkillGroup, UiDictionary } from "@/types/content";

export function SkillsSection({ groups, ui }: { groups: SkillGroup[]; ui: UiDictionary }) {
  const labels = ui.sections.skills;

  return (
    <Section id="skills" eyebrow={labels.eyebrow} title={labels.title}>
      <dl className="divide-y divide-border border-y border-border">
        {groups.map((group) => (
          <div key={group.title} className="grid gap-3 py-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
            <dt className="text-sm font-medium">{group.title}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-foreground/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
