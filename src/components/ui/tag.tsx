import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      dir="auto"
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-card px-2 py-0.5 text-xs font-semibold text-accent-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({ items, label, className }: { items: string[]; label?: string; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}

/**
 * Technology names as a plain run of text in blue ink, the colour the site reserves
 * for technologies. Lighter than tags where a list sits inside running content.
 */
export function TechList({ items, label, className }: { items: string[]; label?: string; className?: string }) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-accent-2", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item} dir="ltr">
          {item}
        </li>
      ))}
    </ul>
  );
}
