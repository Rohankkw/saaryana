import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/properties", label: "Properties" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-[12px] border-b border-border shadow-sm" : "bg-transparent border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-serif text-xl md:text-2xl tracking-tight">
          Saaranya<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/75 hover:text-foreground transition-colors nav-link-underline"
              activeProps={{ className: "text-foreground active" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-secondary transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/list-property" className="hidden md:inline-flex">
            <Button variant="outline" size="sm" className="border-foreground/30 hover:border-foreground">
              List Your Property
            </Button>
          </Link>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Menu"
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-secondary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-foreground/80" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/list-property" onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">List Your Property</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
