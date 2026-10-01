import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PLANS, PLAN_ORDER, type PlanId } from "@/lib/plans";

interface Props {
  currentPlan?: PlanId | undefined;
  onSelect: (plan: PlanId) => void;
  pending?: PlanId | null | undefined;
}

export function PlanCards({ currentPlan, onSelect, pending }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {PLAN_ORDER.map((id) => {
        const plan = PLANS[id];
        const isCurrent = currentPlan === id;
        return (
          <Card
            key={id}
            className={
              plan.highlight
                ? "relative border-primary/50 shadow-lift"
                : "relative border-border shadow-soft"
            }
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                Most popular
              </span>
            )}
            <CardHeader className="pb-2">
              <p className="text-sm font-semibold text-primary">{plan.name}</p>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-3xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">/{plan.priceNote}</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={plan.highlight ? "default" : "outline"}
                disabled={isCurrent || pending === id}
                onClick={() => onSelect(id)}
              >
                {isCurrent
                  ? "Your current plan"
                  : id === "free"
                    ? "Start free"
                    : `Choose ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}