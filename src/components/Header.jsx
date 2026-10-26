import { ChevronDown, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-4">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between rounded-full border border-white/15 bg-card/10 px-4 py-2 shadow-2xl inset-shadow-sm inset-shadow-white/40 backdrop-blur-xl backdrop-saturate-150">
        <Logo />

        <div className="flex items-center gap-3">
          <div className="relative w-96">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/60" />
            <Input
              placeholder="Search movies..."
              type="search"
              className="h-9 w-full rounded-full border-white/40 bg-white/30 pl-9 placeholder:text-foreground/60"
            />
          </div>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full border border-white/40 bg-white/30 transition-colors hover:bg-fuchsia-500 hover:text-white"
          >
            <ChevronDown />
            Genre
          </Button>
        </div>

        <Button
          size="icon-lg"
          aria-label="Toggle dark mode"
          className="rounded-full border-0 bg-linear-to-br from-primary to-fuchsia-500 text-white"
        >
          <Moon />
        </Button>
      </div>
    </header>
  );
}
