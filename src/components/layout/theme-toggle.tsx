"use client";

import { useEffect } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { THEME_STORAGE_KEY } from "@/components/layout/theme-script";

/**
 * Toggles between light and dark. Until the visitor picks a theme, the site
 * follows the OS preference, including live changes.
 *
 * Both icons are rendered and swapped with CSS, so server and client markup
 * always match.
 */
export function ThemeToggle({ label }: { label: string }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) {
        document.documentElement.classList.toggle("dark", event.matches);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the theme still applies for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
    >
      <SunIcon className="hidden dark:block" width={17} height={17} />
      <MoonIcon className="block dark:hidden" width={17} height={17} />
    </button>
  );
}

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}
