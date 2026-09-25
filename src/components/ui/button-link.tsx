import Link from "next/link";
import type { ReactNode } from "react";
import { cn, isExternalUrl, withBasePath } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Adds the download attribute (for files such as the PDF resume). */
  download?: string | boolean;
  "aria-label"?: string;
}

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold whitespace-nowrap transition-all duration-200 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-[0_8px_24px_-10px_var(--accent)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_var(--accent)] hover:brightness-110",
  secondary:
    "border border-border-strong bg-card text-foreground shadow-sm hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent",
  ghost: "text-muted hover:text-accent hover:bg-accent/8",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

/**
 * Link styled as a button. Internal paths use next/link; external URLs,
 * mailto links and downloads use a plain anchor.
 */
export function ButtonLink({ href, children, variant = "primary", className, download, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, className);
  const external = isExternalUrl(href);

  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={withBasePath(href)}
        className={classes}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
