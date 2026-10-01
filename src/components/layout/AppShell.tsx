import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/button";

const TABS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/account", label: "Account & billing" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              activeProps={{ className: "bg-card text-foreground shadow-soft" }}
            >
              {tab.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-auto">
            <Link to="/new">New fix</Link>
          </Button>
        </div>
      </div>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">{children}</main>
      <SiteFooter />
    </div>
  );
}