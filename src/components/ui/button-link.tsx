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
  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary: "border border-border-strong bg-background text-foreground hover:bg-surface hover:border-subtle/60",
  ghost: "text-muted hover:text-foreground hover:bg-surface",
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
