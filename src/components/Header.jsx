import { ChevronDown, Moon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="bg-card border-b">
      <div className="flex justify-between items-center px-5 py-3 max-w-screen-2xl mx-auto">
        <Logo />
        <div className="flex gap-3 items-center">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              type="search"
              className="w-full h-9 pl-9"
            />
          </div>
          <Button variant="outline" size="lg">
            <ChevronDown />
            Genre
          </Button>
        </div>
        <Button variant="outline" size="icon-lg">
          <Moon />
        </Button>
      </div>
    </header>
  );
}
