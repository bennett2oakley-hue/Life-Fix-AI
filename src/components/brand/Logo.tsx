import { Wrench } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="bg-brand inline-flex size-8 items-center justify-center rounded-xl text-primary-foreground shadow-soft">
        <Wrench className="size-4" aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-base font-semibold tracking-tight">
          Life Fix <span className="text-primary">AI</span>
        </span>
      )}
    </span>
  );
}