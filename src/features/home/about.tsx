import { Section } from "@/components/ui/section";
import type { Profile, UiDictionary } from "@/types/content";

export function About({ profile, ui }: { profile: Profile; ui: UiDictionary }) {
  const labels = ui.sections.about;

  return (
    <Section id="about" eyebrow={labels.eyebrow} title={labels.title}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_240px] md:gap-16">
        <div className="max-w-2xl space-y-5 text-base leading-7 text-muted">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div>
          <h3 className="text-sm font-medium">{labels.focusTitle}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            {profile.focus.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-subtle" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
