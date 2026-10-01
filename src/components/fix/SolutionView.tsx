import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Package,
  ShieldAlert,
  Wallet,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Solution } from "@/lib/fix-types";

function urgencyLabel(urgency: Solution["urgency"]) {
  if (urgency === "high") return { text: "Urgent", className: "bg-destructive/15 text-destructive" };
  if (urgency === "medium") return { text: "Soon", className: "bg-warning/20 text-warning-foreground" };
  return { text: "Not urgent", className: "bg-success/15 text-success" };
}

function ListCard({
  title,
  icon,
  items,
  tone = "default",
}: {
  title: string;
  icon: ReactIcon;
  items: string[];
  tone?: "default" | "warning";
}) {
  if (items.length === 0) return null;
  const Icon = icon;
  return (
    <Card className={tone === "warning" ? "border-warning/40 bg-warning/5" : undefined}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4 text-primary" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm leading-relaxed">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

type ReactIcon = typeof CheckCircle2;

export function SolutionView({ solution, problem }: { solution: Solution; problem?: string }) {
  const urgency = urgencyLabel(solution.urgency);

  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{solution.category}</Badge>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${urgency.className}`}>
            {urgency.text}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{solution.title}</h1>
        {solution.summary && (
          <p className="mt-2 text-muted-foreground">{solution.summary}</p>
        )}
      </div>

      {solution.safetyNotice && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <p className="text-sm font-medium">{solution.safetyNotice}</p>
        </div>
      )}

      {problem && (
        <Card className="bg-surface">
          <CardContent className="pt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your problem
            </p>
            <p className="mt-2 text-sm leading-relaxed">{problem}</p>
          </CardContent>
        </Card>
      )}

      <ListCard title="What to do now" icon={Zap} items={solution.doNow} />

      {solution.steps.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
              Step-by-step plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {solution.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <ListCard title="What you may need" icon={Package} items={solution.youMayNeed} />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Estimates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Wallet className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium">Cost</p>
                <p className="text-muted-foreground">{solution.estimatedCost}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <div>
                <p className="font-medium">Time</p>
                <p className="text-muted-foreground">{solution.estimatedTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ListCard
        title="Things to watch out for"
        icon={AlertTriangle}
        items={solution.watchOut}
        tone="warning"
      />
      <ListCard title="Next steps" icon={ArrowRight} items={solution.nextSteps} />

      <p className="text-xs leading-relaxed text-muted-foreground">
        This plan is general information, not professional medical, legal, financial, or emergency
        advice. Use your judgement and contact a qualified professional when the situation calls
        for one.
      </p>
    </div>
  );
}