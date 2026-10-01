import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PLANS } from "@/lib/plans";
import type { UsageSummary } from "@/lib/fix-types";

export function UsageMeter({ usage }: { usage: UsageSummary }) {
  const unlimited = usage.limit === null;
  const pct = unlimited ? 100 : Math.min(100, Math.round((usage.used / usage.limit!) * 100));
  const outOfFixes = !unlimited && usage.used >= usage.limit!;

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold">{PLANS[usage.plan].name} plan</p>
          <p className="text-xs text-muted-foreground">{usage.periodLabel} usage</p>
        </div>
        <p className="text-sm font-medium">
          {unlimited ? `${usage.used} fixes` : `${usage.used} of ${usage.limit} fixes`}
        </p>
      </div>

      {!unlimited && (
        <Progress value={pct} className="mt-3 h-2" aria-label="Monthly fixes used" />
      )}

      {usage.plan !== "pro" && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p className="text-xs text-muted-foreground">
            {outOfFixes
              ? "You've used all your fixes this month."
              : unlimited
                ? "Thanks for being on Pro."
                : `${usage.remaining} left this month.`}
          </p>
          <Button asChild size="sm" variant={outOfFixes ? "default" : "outline"} className="ml-auto">
            <Link to="/pricing">Upgrade</Link>
          </Button>
        </div>
      )}
    </div>
  );
}