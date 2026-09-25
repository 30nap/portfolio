export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint to apply the saved theme (or the OS preference)
 * and avoid a flash of the wrong theme.
 */
const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
