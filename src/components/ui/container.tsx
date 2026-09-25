import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  tight: "max-w-xl",
} as const;

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: keyof typeof widths;
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8", widths[size], className)}>{children}</div>;
}
