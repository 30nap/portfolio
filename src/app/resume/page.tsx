import { JsonLd } from "@/components/ui/json-ld";
import { siteConfig } from "@/data/site";
import { ResumeView } from "@/features/resume/resume-view";
import { getContent, getEmail, getExperienceWithCompanies, getResumePdfUrl, getSocialLinks } from "@/lib/content";
import { buildMetadata, buildPersonJsonLd } from "@/lib/seo";

const { profile, ui } = getContent();

export const metadata = buildMetadata({
  title: ui.resume.title,
  description: `Resume of ${profile.name}, ${profile.role}. ${ui.resume.description}`,
  path: "/resume/",
});

export default function ResumePage() {
  const content = getContent();

  return (
    <>
      <JsonLd data={buildPersonJsonLd("/resume/")} />
      <ResumeView
        content={content}
        experience={getExperienceWithCompanies(content)}
        socialLinks={getSocialLinks()}
        email={getEmail()}
        siteUrl={siteConfig.url}
        pdfUrl={getResumePdfUrl()}
        pdfDownloadName={siteConfig.resume.downloadName}
      />
    </>
  );
}
