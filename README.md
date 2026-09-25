# Sina — Portfolio & Resume

Personal portfolio and resume site for Sina, Java Backend Developer.
Built with Next.js (App Router), TypeScript (strict) and Tailwind CSS. It has no runtime
dependencies beyond Next.js and React. The site is a fully static export (`out/`), deployed to
GitHub Pages: **https://30nap.github.io/portfolio/**

## Project structure

```
src/
  app/                     Routes and route-level SEO
    layout.tsx             Global layout: fonts, theme script, navbar, footer, default metadata
    page.tsx               Home page (hero → contact)
    resume/page.tsx        /resume, printable
    projects/[slug]/       /projects/{slug} case study pages (statically generated)
    sitemap.ts, robots.ts  /sitemap.xml and /robots.txt
    og.png/route.tsx       Social preview image (/og.png) generated from profile data
    icon.svg               Favicon
  components/
    layout/                Navbar, footer, theme toggle, theme script
    ui/                    Small reusable primitives (Section, Container, ButtonLink, Tag, icons…)
  features/
    home/                  Home page sections
    projects/              Project card, links, status badge, case study view
    resume/                Resume view and print button
    contact/               Contact form (client component)
  data/                    ← All site content lives here
    site.ts                URL, email, resume PDF, contact form endpoint, SEO defaults
    social.ts              GitHub / LinkedIn links
    en/                    English copy (one file per content type)
  lib/                     Content access helpers, SEO helpers, i18n config
  types/content.ts         Types every data file must satisfy
```

Components never import data directly. Pages load content with `getContent()` and pass it down
as props, so UI components stay reusable and locale-agnostic.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # static export to ./out
npm run start      # preview ./out at http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # TypeScript strict check
```

## Where personal data is stored

| What | File |
| --- | --- |
| Name, role, tagline, About text, focus areas, resume summary | `src/data/en/profile.ts` |
| Companies | `src/data/en/companies.ts` |
| Experience (roles, dates, highlights, technologies) | `src/data/en/experience.ts` |
| Projects and case studies | `src/data/en/projects.ts` |
| Skills | `src/data/en/skills.ts` |
| "How I Build Software" principles | `src/data/en/principles.ts` |
| Education (graduation year is configurable) | `src/data/en/education.ts` |
| Navigation | `src/data/en/navigation.ts` |
| Headings, buttons, form messages | `src/data/en/ui.ts` |
| Email, resume PDF, form endpoint, SEO title/description | `src/data/site.ts` |
| GitHub / LinkedIn | `src/data/social.ts` |

Empty values are hidden rather than rendered as broken or fake links.

### Fill these in before publishing

Search the codebase for `TODO(sina)`:

- **Email:** `siteConfig.email` in `src/data/site.ts`. This turns on the email link and the contact form.
- **LinkedIn URL:** `src/data/social.ts`.
- **Resume PDF:** `siteConfig.resume.pdfUrl`. See [Change the resume PDF](#change-the-resume-pdf).
- **Education years:** `src/data/en/education.ts`.
- **Location and availability badge** (both optional): `src/data/en/profile.ts`.
- **Project status**, and the LifeOS repository: it is not publicly reachable right now, so make it public or remove the link.
- **Experience highlights:** they are deliberately minimal. Add real detail, and add numbers only when you can back them up.
- **Clinico case study:** it was written from the Clinico README. Review the wording, then add *Challenges* and *What I learned* in your own words.

## Add a project

Add an entry to `src/data/en/projects.ts`:

```ts
{
  slug: "my-project",                // page: /projects/my-project
  name: "My Project",
  summary: "One or two sentences.",
  techStack: ["Java", "Spring Boot"],
  status: "in-development",          // in-development | active | completed | maintained | archived
  featured: true,                    // show on the home page
  links: {
    github: "https://github.com/…",  // optional
    demo: "https://…",               // optional
  },
  image: {                           // optional: put the file in /public/projects
    src: "/projects/my-project.png",
    alt: "Dashboard of My Project",
    width: 1600,
    height: 900,
  },
  caseStudy: {                       // optional: every section is optional
    problem: ["…"],
    context: ["…"],
    architecture: ["…"],
    decisions: ["…", "…"],           // rendered as a list
    challenges: ["…"],               // rendered as a list
    solution: ["…"],
    technologies: ["…"],             // falls back to techStack
    learnings: ["…"],                // "What I learned", rendered as a list
  },
}
```

- A static page is generated for every project.
- Missing links are not shown.
- Empty case study sections are hidden.
- The **Case study** link only appears once at least one section has content.
- A page without case study content shows a short notice, is marked `noindex` and is left out of the sitemap.

## Change the resume PDF

1. Put the file in `public/`, e.g. `public/resume/sina-resume.pdf`.
2. Set `siteConfig.resume.pdfUrl = "/resume/sina-resume.pdf"` in `src/data/site.ts`. An absolute URL (Google Drive, S3, …) also works.
3. Optionally change `siteConfig.resume.downloadName`.

While `pdfUrl` is empty, the hero button reads **View Resume** and links to `/resume`. That page has a
**Print / Save as PDF** button and a print stylesheet, so you can produce a clean PDF straight from
the browser. Once `pdfUrl` is set, the buttons switch to **Download Resume**.

## Contact form

The form needs no backend.

- If `siteConfig.contactForm.endpoint` is set, the form POSTs JSON `{ name, email, message }` to that
  endpoint. Any service that accepts JSON works (Formspree, Basin, your own API).
- Otherwise it opens the visitor's email client with the message pre-filled, sent to `siteConfig.email`.
- If neither is configured, the form is hidden.

## Theme

The site follows the OS light/dark preference until the visitor uses the toggle; that choice is then
saved in `localStorage`. An inline script applies the theme before first paint, so the wrong theme
never flashes. Colors are CSS variables in `src/app/globals.css`.

## SEO

- Metadata, canonical URLs, OpenGraph and Twitter/X cards: `src/lib/seo.ts` and `src/app/layout.tsx`.
- Structured data: schema.org `ProfilePage` + `Person` JSON-LD on `/` and `/resume`.
- `/sitemap.xml`, `/robots.txt` and `/og.png` are generated from the data files.
- Canonical and OpenGraph URLs come from `NEXT_PUBLIC_SITE_URL`. The GitHub Pages workflow sets it
  automatically. For other hosts, see `.env.example`.
- On a project site (`30nap.github.io/portfolio`), crawlers only read `robots.txt` at the domain
  root, so submit `sitemap.xml` in Google Search Console. With a custom domain, both work as-is.

## Adding Persian later

The site is structured for a second locale:

1. Add `"fa"` to the `Locale` type (`src/types/content.ts`) and to `localeConfig` in
   `src/lib/i18n.ts` with `dir: "rtl"`.
2. Copy `src/data/en/` to `src/data/fa/`, translate it, and register it in `src/lib/content.ts`.
   TypeScript flags any missing field.
3. Add the routes, e.g. move the pages under `src/app/[locale]/` and pass `locale` to `getContent()`.
4. Load a Persian font (e.g. Vazirmatn) for `fa`. Layout spacing already uses logical properties
   (`ps-`/`pe-`/`start-`), so it mirrors correctly in RTL.

## Deploy

### GitHub Pages (current setup)

`.github/workflows/deploy.yml` runs lint, typecheck and the static build on every push. Pushes
to the **default branch** are also published to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Then push,
or re-run the workflow from the *Actions* tab.

The workflow reads the base path and URL from the Pages configuration:

- on `https://30nap.github.io/portfolio/` it builds with `NEXT_PUBLIC_BASE_PATH=/portfolio`;
- with a custom domain (set under Settings → Pages) it builds with an empty base path, and
  canonical URLs use your domain. Nothing in the code needs to change.

To use `https://30nap.github.io/` without the `/portfolio` suffix, rename the repository to
`30nap.github.io`.

**Base path in code:** `next/link` adds the base path automatically. Plain `<a href="/…">` links
and `next/image` `src` values need `withBasePath()` from `src/lib/utils.ts`. The resume PDF
button and project images already use it.

### Other static hosts

`npm run build` writes a self-contained static site to `out/`. Upload that folder to Netlify,
Cloudflare Pages, Vercel or any web server; set `NEXT_PUBLIC_SITE_URL` (and
`NEXT_PUBLIC_BASE_PATH` if the site is served from a sub-path) at build time.
