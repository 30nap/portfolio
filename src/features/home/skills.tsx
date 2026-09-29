import { Section } from "@/components/ui/section";
import type { SkillGroup, UiDictionary } from "@/types/content";

/** Skills as ledger rows: the area on one side, the technologies in blue ink on the other. */
export function SkillsSection({ groups, ui }: { groups: SkillGroup[]; ui: UiDictionary }) {
  return (
    <Section id="skills" title={ui.sections.skills.title}>
      <ul>
        {groups.map((group) => (
          <li
            key={group.title}
            className="grid gap-x-10 gap-y-2 border-t border-border py-5 first:border-t-0 first:pt-0 sm:grid-cols-[12rem_minmax(0,1fr)]"
          >
            <h3 className="font-extrabold">{group.title}</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-1 text-base font-semibold text-accent-2 sm:text-lg">
              {group.items.map((item) => (
                <li key={item} dir="ltr">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
