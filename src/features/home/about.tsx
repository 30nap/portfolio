import { Section } from "@/components/ui/section";
import type { Profile, UiDictionary } from "@/types/content";

export function About({ profile, ui }: { profile: Profile; ui: UiDictionary }) {
  const labels = ui.sections.about;

  return (
    <Section id="about" title={labels.title}>
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-16">
        <div className="max-w-[62ch] space-y-6 text-base leading-8 text-muted sm:text-[17px] sm:leading-9">
          {profile.about.map((paragraph, index) => (
            <p
              key={paragraph}
              className={index === 0 ? "text-lg leading-9 font-medium text-foreground sm:text-xl sm:leading-10" : undefined}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-extrabold text-accent">{labels.focusTitle}</h3>
          <ul className="mt-3 text-[15px]">
            {profile.focus.map((item) => (
              <li key={item} className="border-t border-border py-2.5 first:border-t-0">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
