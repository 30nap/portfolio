/* eslint-disable @next/next/no-img-element -- the optional avatar is a small static file; next/image adds nothing in a static export. */
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BriefcaseIcon, BuildingIcon, DownloadIcon, FileIcon, MapPinIcon } from "@/components/ui/icons";
import { SocialLinks } from "@/components/ui/social-links";
import { TagList } from "@/components/ui/tag";
import { formatDateRange, type ExperienceWithCompany } from "@/lib/content";
import { withBasePath } from "@/lib/utils";
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
      <div aria-hidden="true" className="bg-glow absolute inset-0 -z-10" />
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-70" />

      <Container className="grid gap-14 pt-14 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-16">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3.5 py-1.5 text-xs font-medium text-accent">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability ?? (
              <span dir="ltr" lang="en">
                {profile.roleSubtitle}
              </span>
            )}
          </p>

          <h1 id="hero-heading" className="mt-7">
            <span className="block text-5xl leading-[1.2] font-black tracking-tight text-balance sm:text-7xl sm:leading-[1.15]">
              {profile.name}
            </span>
            <span className="sr-only"> — </span>
            <span className="text-gradient mt-3 block pb-1 text-2xl font-bold sm:mt-4 sm:text-4xl">{profile.role}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg sm:leading-9">{profile.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-sm text-foreground/80 backdrop-blur-sm"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
            {profile.location ? (
              <li className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-sm text-foreground/80">
                <MapPinIcon className="text-accent" />
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
              <BriefcaseIcon />
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
          <aside aria-label={labels.snapshotTitle} className="animate-fade-up relative [animation-delay:150ms]">
            {/* Soft halo behind the card */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20 blur-2xl"
            />
            <div className="card overflow-hidden">
              <div className="flex items-center gap-4 border-b border-border bg-gradient-to-l from-accent/10 via-transparent to-accent-2/10 p-6">
                {profile.avatar ? (
                  <img
                    src={withBasePath(profile.avatar.src)}
                    alt={profile.avatar.alt}
                    width={56}
                    height={56}
                    className="size-14 rounded-2xl object-cover ring-2 ring-card"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-2xl font-black text-white shadow-lg shadow-accent/30"
                  >
                    {profile.name.charAt(0)}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold">{profile.name}</p>
                  <p className="truncate text-sm text-muted">{profile.role}</p>
                </div>
              </div>

              {profile.stats.length > 0 ? (
                <dl className="grid grid-cols-3 divide-x divide-border border-b border-border">
                  {profile.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col-reverse items-center gap-1 px-2 py-4 text-center">
                      <dt className="text-[11px] leading-4 text-subtle">{stat.label}</dt>
                      <dd className="text-2xl font-black text-foreground">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <dl className="space-y-5 p-6 text-sm">
                <div className="flex gap-3">
                  <span className="icon-badge size-9">
                    <BriefcaseIcon width={16} height={16} />
                  </span>
                  <div>
                    <dt className="text-xs text-subtle">{labels.current}</dt>
                    <dd className="mt-0.5 font-semibold">
                      {current.title} · {current.company.name}
                    </dd>
                    <dd className="text-xs text-muted">{formatDateRange(current.start, current.end, ui)}</dd>
                  </div>
                </div>
                {previousCompanies.length > 0 ? (
                  <div className="flex gap-3">
                    <span className="icon-badge size-9">
                      <BuildingIcon width={16} height={16} />
                    </span>
                    <div>
                      <dt className="text-xs text-subtle">{labels.previously}</dt>
                      <dd className="mt-0.5 font-semibold">{previousCompanies.join(ui.listSeparator)}</dd>
                    </div>
                  </div>
                ) : null}
                <div>
                  <dt className="text-xs text-subtle">{labels.coreStack}</dt>
                  <dd className="mt-2.5">
                    <TagList items={profile.coreStack} />
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        ) : null}
      </Container>
    </section>
  );
}
