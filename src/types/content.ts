/**
 * Content model for the whole site.
 *
 * Every piece of copy rendered by the UI is described here. Components receive
 * these objects as props and never import data files directly, so a second
 * locale only needs a new set of data files that satisfy `SiteContent`.
 */

export type Locale = "en";

export type SocialPlatform = "github" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Full profile URL. Leave empty to hide the link everywhere. */
  url: string;
  /** Optional display handle, e.g. "30nap". */
  handle?: string;
}

export interface Profile {
  name: string;
  /** Main job title shown in the hero, navbar metadata and resume. */
  role: string;
  /** One sentence shown under the hero headline. */
  tagline: string;
  /** Short facts shown under the tagline, e.g. "5+ years of experience". */
  highlights: string[];
  /** Short list of core technologies shown in the hero snapshot. */
  coreStack: string[];
  /** Optional availability badge. Set to `null` to hide it. */
  availability: string | null;
  /** Optional, e.g. "Tehran, Iran" or "Remote". Empty string hides it. */
  location: string;
  /** Paragraphs for the About section. */
  about: string[];
  /** Areas of focus listed next to the About text. */
  focus: string[];
  /** Resume summary paragraph. */
  resumeSummary: string;
}

export interface Company {
  id: string;
  name: string;
  /** Optional company website. Empty string hides the link. */
  url: string;
  /** Short context, e.g. "Banking software". */
  industry: string;
}

export interface Experience {
  companyId: string;
  title: string;
  /** Free-form date strings, e.g. "2025" or "Mar 2025". */
  start: string;
  /** `null` renders as "Present". */
  end: string | null;
  /** Optional one-line context shown under the title. */
  summary?: string;
  /** Responsibilities and achievements. Keep them factual. */
  highlights: string[];
  technologies: string[];
}

export type ProjectStatus =
  | "in-development"
  | "active"
  | "completed"
  | "maintained"
  | "archived";

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface ProjectImage {
  /** Path under /public, e.g. "/projects/lifeos.png". */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  problem?: string[];
  context?: string[];
  architecture?: string[];
  decisions?: string[];
  challenges?: string[];
  solution?: string[];
  technologies?: string[];
  learnings?: string[];
}

export interface Project {
  /** URL segment: /projects/{slug} */
  slug: string;
  name: string;
  /** One or two sentences for cards. */
  summary: string;
  techStack: string[];
  status: ProjectStatus;
  featured: boolean;
  links: ProjectLinks;
  image?: ProjectImage;
  caseStudy?: CaseStudy;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Principle {
  title: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  /** e.g. "2021". Empty string hides it. */
  start: string;
  /** Graduation year. Empty string hides it. */
  end: string;
  /** `true` renders the end date as "Expected {end}" (or "In progress"). */
  inProgress: boolean;
  details?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

/** Labels, headings and microcopy used by the UI. */
export interface UiDictionary {
  skipToContent: string;
  nav: {
    home: string;
    openMenu: string;
    closeMenu: string;
    primary: string;
  };
  theme: {
    toggle: string;
  };
  hero: {
    viewProjects: string;
    viewExperience: string;
    downloadResume: string;
    viewResume: string;
    contact: string;
    snapshotTitle: string;
    current: string;
    previously: string;
    coreStack: string;
  };
  sections: {
    about: { eyebrow: string; title: string; focusTitle: string };
    experience: { eyebrow: string; title: string };
    projects: { eyebrow: string; title: string; description: string };
    skills: { eyebrow: string; title: string };
    principles: { eyebrow: string; title: string };
    education: { eyebrow: string; title: string };
    contact: { eyebrow: string; title: string; description: string };
  };
  experience: { present: string };
  education: { expected: string; inProgress: string };
  projects: {
    sourceCode: string;
    liveDemo: string;
    caseStudy: string;
    status: Record<ProjectStatus, string>;
  };
  caseStudy: {
    back: string;
    technologies: string;
    pendingTitle: string;
    pendingBody: string;
    sections: Record<Exclude<keyof CaseStudy, "technologies">, string>;
  };
  contact: {
    email: string;
    formTitle: string;
    name: string;
    emailField: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    successMailto: string;
    failure: string;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      messageRequired: string;
      messageTooShort: string;
      summary: string;
    };
  };
  resume: {
    title: string;
    description: string;
    downloadPdf: string;
    print: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    contact: string;
  };
  footer: {
    rights: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
}

export interface SiteContent {
  profile: Profile;
  navigation: NavItem[];
  companies: Company[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  principles: Principle[];
  education: Education[];
  ui: UiDictionary;
}
