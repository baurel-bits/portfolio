"use client";

import { Button } from "@/components/ui/button";
import { PrinterIcon } from "@/components/ui/icons";

export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="signal" onClick={() => window.print()} className="no-print">
      <PrinterIcon />
      {label}
    </Button>
  );
}
