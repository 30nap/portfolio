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
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-bold whitespace-nowrap transition-colors duration-200 select-none";

const variants: Record<Variant, string> = {
  // Ink button that takes the ledger's red on hover.
  primary: "bg-foreground text-background hover:bg-accent hover:text-accent-foreground",
  secondary: "border border-foreground/30 text-foreground hover:border-foreground hover:bg-foreground/5",
  ghost: "px-2 text-foreground underline decoration-accent decoration-2 underline-offset-8 hover:text-accent",
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
