/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function isExternalUrl(href: string): boolean {
  return /^https?:\/\//.test(href);
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes root-relative paths with the configured base path.
 * next/link does this automatically; plain anchors and next/image `src` do not.
 */
export function withBasePath(href: string): string {
  return href.startsWith("/") && !href.startsWith("//") ? `${basePath}${href}` : href;
}
