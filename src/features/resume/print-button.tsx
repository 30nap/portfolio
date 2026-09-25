"use client";

import { buttonClasses } from "@/components/ui/button-link";
import { PrinterIcon } from "@/components/ui/icons";

export function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClasses("secondary")}>
      <PrinterIcon />
      {label}
    </button>
  );
}
