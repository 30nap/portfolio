import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { localizeDigits } from "@/lib/i18n";
import type { Principle, UiDictionary } from "@/types/content";

export function PrinciplesSection({ principles, ui }: { principles: Principle[]; ui: UiDictionary }) {
  const labels = ui.sections.principles;

  return (
    <Section id="engineering" icon="layers" eyebrow={labels.eyebrow} title={labels.title}>
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => (
          <li key={principle.title} className="reveal card card-hover relative overflow-hidden p-6">
            <span
              aria-hidden="true"
              className="absolute top-4 end-5 text-5xl leading-none font-black text-foreground/[0.06] select-none"
            >
              {localizeDigits(String(index + 1).padStart(2, "0"), ui.digits)}
            </span>
            <span className="icon-badge size-11">
              <Icon name={principle.icon ?? "check"} width={20} height={20} />
            </span>
            <h3 className="mt-5 text-lg font-bold">{principle.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{principle.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
