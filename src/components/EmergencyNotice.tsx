import { AlertTriangle } from "lucide-react";

export function EmergencyNotice({ className = "" }: { className?: string }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm ${className}`}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
      <p className="text-foreground">
        <span className="font-semibold">If this is an emergency, stop here.</span> For danger to
        life, serious injury, fire, gas leaks, crime in progress, or thoughts of self-harm, call
        your local emergency number right away. Life Fix AI is not an emergency service.
      </p>
    </div>
  );
}