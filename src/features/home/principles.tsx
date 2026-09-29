import { Section } from "@/components/ui/section";
import type { Principle, UiDictionary } from "@/types/content";

export function PrinciplesSection({ principles, ui }: { principles: Principle[]; ui: UiDictionary }) {
  return (
    <Section id="engineering" title={ui.sections.principles.title}>
      <ul className="grid gap-x-12 sm:grid-cols-2">
        {principles.map((principle) => (
          <li key={principle.title} className="border-t border-border py-6">
            <h3 className="text-lg font-extrabold">{principle.title}</h3>
            <p className="mt-2 max-w-[48ch] text-[15px] leading-8 text-muted">{principle.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
