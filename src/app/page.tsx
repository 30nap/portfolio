import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/data/site";
import { About } from "@/features/home/about";
import { ContactSection } from "@/features/home/contact";
import { EducationSection } from "@/features/home/education";
import { ExperienceSection } from "@/features/home/experience";
import { Hero } from "@/features/home/hero";
import { PrinciplesSection } from "@/features/home/principles";
import { ProjectsSection } from "@/features/home/projects";
import { SkillsSection } from "@/features/home/skills";
import {
  getContent,
  getEmail,
  getExperienceWithCompanies,
  getResumePdfUrl,
  getSocialLinks,
} from "@/lib/content";
import { buildMetadata, buildPersonJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  const content = getContent();
  const { profile, ui } = content;
  const experience = getExperienceWithCompanies(content);
  const socialLinks = getSocialLinks();
  const email = getEmail();

  return (
    <>
      <JsonLd data={buildPersonJsonLd("/")} />
      <Hero
        profile={profile}
        experience={experience}
        socialLinks={socialLinks}
        email={email}
        resumePdfUrl={getResumePdfUrl()}
        resumeDownloadName={siteConfig.resume.downloadName}
        ui={ui}
      />
      <About profile={profile} ui={ui} />
      <ExperienceSection items={experience} ui={ui} />
      <ProjectsSection projects={content.projects} ui={ui} />
      <SkillsSection groups={content.skills} ui={ui} />
      <PrinciplesSection principles={content.principles} ui={ui} />
      <EducationSection items={content.education} ui={ui} />
      <ContactSection
        email={email}
        socialLinks={socialLinks}
        formEndpoint={siteConfig.contactForm.endpoint.trim() || null}
        ui={ui}
      />
    </>
  );
}
