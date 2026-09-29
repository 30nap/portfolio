import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { DownloadIcon, MapPinIcon } from "@/components/ui/icons";
import { contentColumnClass, ledgerGridClass, marginColumnClass } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { CareerTrace } from "@/features/home/career-trace";
import type { ExperienceWithCompany } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { Profile, SocialLink, UiDictionary } from "@/types/content";

interface HeroProps {
  profile: Profile;
  experience: ExperienceWithCompany[];
  socialLinks: SocialLink[];
  email: string | null;
  resumePdfUrl: string | null;
  resumeDownloadName: string;
  ui: UiDictionary;
}

export function Hero({ profile, experience, socialLinks, email, resumePdfUrl, resumeDownloadName, ui }: HeroProps) {
  const labels = ui.hero;

  return (
    <section aria-labelledby="hero-heading">
      <Container className={ledgerGridClass}>
        {/* Margin column: what Sina does, set against the name like a ledger's account heading. */}
        <div className={cn("pt-12 sm:pt-16 lg:pt-28 lg:pb-16", marginColumnClass)}>
          <p className="text-lg font-bold">{profile.role}</p>
          <p dir="ltr" lang="en" className="mt-1 text-end text-sm leading-6 text-muted">
            {profile.roleSubtitle}
          </p>
          {profile.availability ? (
            <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
              {profile.availability}
            </p>
          ) : null}
          {profile.location ? (
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPinIcon />
              {profile.location}
            </p>
          ) : null}
        </div>

        <div className={cn("pt-6 pb-10 lg:pt-24 lg:pb-16", contentColumnClass)}>
          <h1 id="hero-heading" className="text-[clamp(3.5rem,16vw,8.5rem)] leading-[1.15] font-black text-balance">
            {profile.name}
            <span className="sr-only">، {profile.role}</span>
          </h1>

          <p className="mt-6 max-w-[38ch] text-lg leading-9 text-muted sm:text-xl sm:leading-10">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#projects">{labels.viewProjects}</ButtonLink>
            {resumePdfUrl ? (
              <ButtonLink href={resumePdfUrl} download={resumeDownloadName} variant="secondary">
                <DownloadIcon />
                {labels.downloadResume}
              </ButtonLink>
            ) : (
              <ButtonLink href="/resume" variant="secondary">
                {labels.viewResume}
              </ButtonLink>
            )}
            <ButtonLink href="/#contact" variant="ghost">
              {labels.contact}
            </ButtonLink>
            <SocialLinks links={socialLinks} email={email} emailLabel={ui.contact.email} className="ms-auto" />
          </div>
        </div>
      </Container>

      <Container>
        <CareerTrace items={experience} ui={ui} label={ui.sections.experience.eyebrow} />
      </Container>
    </section>
  );
}
