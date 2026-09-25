import { CheckIcon, CompassIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import type { Profile, UiDictionary } from "@/types/content";

export function About({ profile, ui }: { profile: Profile; ui: UiDictionary }) {
  const labels = ui.sections.about;

  return (
    <Section id="about" icon="user" eyebrow={labels.eyebrow} title={labels.title}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div className="reveal max-w-2xl space-y-6 text-base leading-8 text-muted sm:text-[17px] sm:leading-9">
          {profile.about.map((paragraph, index) => (
            <p key={paragraph} className={index === 0 ? "text-lg leading-9 font-medium text-foreground/90" : undefined}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="reveal card p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="icon-badge size-10">
              <CompassIcon width={18} height={18} />
            </span>
            <h3 className="text-base font-bold">{labels.focusTitle}</h3>
          </div>
          <ul className="mt-6 space-y-3.5">
            {profile.focus.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-foreground/85">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                  <CheckIcon width={12} height={12} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
