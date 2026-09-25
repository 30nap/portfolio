import type { Locale } from "@/types/content";

interface LocaleConfig {
  /** Value for <html lang>. */
  lang: string;
  /** Text direction. Persian ("fa") will be "rtl". */
  dir: "ltr" | "rtl";
  /** OpenGraph locale. */
  ogLocale: string;
}

export const defaultLocale: Locale = "en";

export const localeConfig: Record<Locale, LocaleConfig> = {
  en: { lang: "en", dir: "ltr", ogLocale: "en_US" },
};
