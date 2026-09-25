import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { SkillGroup, UiDictionary } from "@/types/content";

export function SkillsSection({ groups, ui }: { groups: SkillGroup[]; ui: UiDictionary }) {
  const labels = ui.sections.skills;

  return (
    <Section id="skills" icon="cpu" tone="muted" eyebrow={labels.eyebrow} title={labels.title}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, index) => (
          <li
            key={group.title}
            // The first (primary) group spans two columns on wide screens.
            className={cn("reveal card card-hover p-6", index === 0 && "lg:col-span-2")}
          >
            <div className="flex items-center gap-3">
              <span className="icon-badge size-10">
                <Icon name={group.icon ?? "code"} width={18} height={18} />
              </span>
              <h3 className="text-base font-bold">{group.title}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  dir="auto"
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground/85 transition-colors hover:border-accent/40 hover:text-accent"
                >
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
