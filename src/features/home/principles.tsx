import { Section } from "@/components/ui/section";
import { localizeDigits } from "@/lib/i18n";
import type { Principle, UiDictionary } from "@/types/content";

export function PrinciplesSection({ principles, ui }: { principles: Principle[]; ui: UiDictionary }) {
  const labels = ui.sections.principles;

  return (
    <Section id="engineering" eyebrow={labels.eyebrow} title={labels.title}>
      <ol className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => (
          <li key={principle.title}>
            <p aria-hidden="true" className="font-mono text-xs text-subtle rtl:font-sans">
              {localizeDigits(String(index + 1).padStart(2, "0"), ui.digits)}
            </p>
            <h3 className="mt-2 text-base font-semibold tracking-tight">{principle.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{principle.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
