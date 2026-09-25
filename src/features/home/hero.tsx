import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, DownloadIcon, FileIcon, MapPinIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/social-links";
import { TagList } from "@/components/ui/tag";
import { formatDateRange, type ExperienceWithCompany } from "@/lib/content";
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
  const current = experience.find((item) => item.end === null);
  const previous = experience.filter((item) => item !== current);
  const previousCompanies = [...new Set(previous.map((item) => item.company.name))];

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <Container className="grid gap-14 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-16">
        <div className="animate-fade-up">
          {profile.availability ? (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
              {profile.availability}
            </p>
          ) : null}

          <h1 id="hero-heading">
            <span className="block text-4xl font-bold tracking-tight text-balance sm:text-6xl sm:leading-[1.15]">
              {profile.name}
            </span>
            <span className="sr-only"> — </span>
            <span className="mt-3 block text-2xl font-medium text-foreground/75 sm:mt-4 sm:text-3xl">{profile.role}</span>
          </h1>
          {profile.roleSubtitle ? (
            <p className="mt-3 font-mono text-sm text-subtle">
              <span dir="ltr" lang="en">
                {profile.roleSubtitle}
              </span>
            </p>
          ) : null}

          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{profile.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/80">
            {profile.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-subtle" />
                {item}
              </li>
            ))}
            {profile.location ? (
              <li className="flex items-center gap-1.5">
                <MapPinIcon className="text-subtle" />
                {profile.location}
              </li>
            ) : null}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/#projects">
              {labels.viewProjects}
              <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="/#experience" variant="secondary">
              {labels.viewExperience}
            </ButtonLink>
            {resumePdfUrl ? (
              <ButtonLink href={resumePdfUrl} download={resumeDownloadName} variant="secondary">
                <DownloadIcon />
                {labels.downloadResume}
              </ButtonLink>
            ) : (
              <ButtonLink href="/resume" variant="secondary">
                <FileIcon />
                {labels.viewResume}
              </ButtonLink>
            )}
            <ButtonLink href="/#contact" variant="ghost">
              {labels.contact}
            </ButtonLink>
          </div>

          <SocialLinks links={socialLinks} email={email} emailLabel={ui.contact.email} className="mt-8 -ms-2" />
        </div>

        {current ? (
          <aside
            aria-label={labels.snapshotTitle}
            className="animate-fade-up rounded-xl border border-border bg-background/80 p-6 backdrop-blur-sm [animation-delay:120ms]"
          >
            <p className="eyebrow">
              {labels.snapshotTitle}
            </p>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="text-subtle">{labels.current}</dt>
                <dd className="mt-1 font-medium">
                  {current.title} · {current.company.name}
                </dd>
                <dd className="text-muted">{formatDateRange(current.start, current.end, ui)}</dd>
              </div>
              {previousCompanies.length > 0 ? (
                <div>
                  <dt className="text-subtle">{labels.previously}</dt>
                  <dd className="mt-1 font-medium">{previousCompanies.join(ui.listSeparator)}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-subtle">{labels.coreStack}</dt>
                <dd className="mt-2">
                  <TagList items={profile.coreStack} />
                </dd>
              </div>
            </dl>
          </aside>
        ) : null}
      </Container>
    </section>
  );
}
