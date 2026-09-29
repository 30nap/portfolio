import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/content";

const dot: Record<ProjectStatus, string> = {
  "in-development": "bg-amber-500",
  active: "bg-success",
  completed: "bg-success",
  maintained: "bg-accent-2",
  archived: "bg-subtle",
};

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted">
      <span aria-hidden="true" className={cn("size-2 rounded-full", dot[status])} />
      {label}
    </span>
  );
}
