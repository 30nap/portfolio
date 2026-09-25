import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/content";

const dot: Record<ProjectStatus, string> = {
  "in-development": "bg-amber-500",
  active: "bg-success",
  completed: "bg-success",
  maintained: "bg-accent",
  archived: "bg-subtle",
};

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted">
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[status])} />
      {label}
    </span>
  );
}
