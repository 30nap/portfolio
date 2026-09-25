import type { Locale } from "@/types/content";

interface LocaleConfig {
  /** Value for <html lang>. */
  lang: string;
  /** Text direction. */
  dir: "ltr" | "rtl";
  /** OpenGraph locale. */
  ogLocale: string;
}

/** Locale rendered by the site. The English content in src/data/en is kept for an English version. */
export const defaultLocale: Locale = "fa";

export const localeConfig: Record<Locale, LocaleConfig> = {
  fa: { lang: "fa", dir: "rtl", ogLocale: "fa_IR" },
  en: { lang: "en", dir: "ltr", ogLocale: "en_US" },
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Replaces 0-9 with Persian digits. Use only for prose and dates, never for URLs, versions or code. */
export function toPersianDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

export function localizeDigits(value: string | number, digits: "latin" | "persian"): string {
  return digits === "persian" ? toPersianDigits(value) : String(value);
}

/**
 * In RTL text, a Persian comma between two Latin words ("Java، Spring") is resolved as part of
 * the Latin run, so the words render in reverse reading order. A right-to-left mark after the
 * comma anchors it to the Persian text. Applied automatically to RTL content in lib/content.ts,
 * so data files can be written naturally.
 */
export function fixRtlPunctuation(text: string): string {
  return text.replace(/([A-Za-z0-9)\]/+#.-])([،؛])(?!‏)/g, "$1$2‏");
}

/** Applies `fn` to every string in a plain data structure. */
export function mapStrings<T>(value: T, fn: (text: string) => string): T {
  if (typeof value === "string") return fn(value) as T;
  if (Array.isArray(value)) return value.map((item) => mapStrings(item, fn)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, mapStrings(item, fn)]),
    ) as T;
  }
  return value;
}
