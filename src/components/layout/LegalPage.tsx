import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}