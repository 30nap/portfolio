import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ThemeScript } from "@/components/layout/theme-script";
import { siteConfig } from "@/data/site";
import { getContent, getSocialLinks } from "@/lib/content";
import { defaultLocale, localeConfig } from "@/lib/i18n";
import { getOgImage } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const { profile } = getContent();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${profile.name}`,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: localeConfig[defaultLocale].ogLocale,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: "/",
    images: [getOgImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [getOgImage()],
    ...(siteConfig.seo.twitterHandle ? { creator: siteConfig.seo.twitterHandle } : {}),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const { ui, navigation } = getContent();
  const locale = localeConfig[defaultLocale];

  return (
    <html
      lang={locale.lang}
      dir={locale.dir}
      // The theme script adds the "dark" class before hydration.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          {ui.skipToContent}
        </a>
        <Navbar name={profile.name} items={navigation} labels={{ nav: ui.nav, theme: ui.theme }} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer name={profile.name} role={profile.role} links={getSocialLinks()} rights={ui.footer.rights} />
      </body>
    </html>
  );
}
