import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              Practical, step-by-step help for everyday problems. Clear plans you can actually
              follow.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-8 text-sm" aria-label="Footer">
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Product</span>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
                How it works
              </Link>
              <Link to="/auth" className="text-muted-foreground hover:text-foreground">
                Log in
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">Legal</span>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground">
                Disclaimer
              </Link>
            </div>
          </nav>
        </div>

        <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          Life Fix AI gives general informational guidance only. It is not medical, legal,
          financial, or professional advice, and it is not an emergency service. In an emergency,
          contact your local emergency number immediately.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Life Fix AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}