import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export function Header() {
  const [location, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by trying to fetch current user
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => {
        setIsLoggedIn(res.ok);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, [location]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLoggedIn(false);
      setLocation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/browse", label: "Browse" },
    { href: "/events", label: "Events" },
    { href: "/membership", label: "Membership" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" data-testid="button-dashboard">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" data-testid="button-login">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button data-testid="button-signup">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-menu" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8" role="navigation" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <span
                        className={`text-lg font-medium transition-colors hover:text-primary cursor-pointer ${
                          location === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4">
                    {isLoggedIn ? (
                      <>
                        <Link href="/dashboard">
                          <Button variant="ghost" className="w-full" asChild>
                            <span>Dashboard</span>
                          </Button>
                        </Link>
                        <Button variant="outline" onClick={handleLogout} className="w-full">Sign Out</Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button variant="ghost" className="w-full" asChild>
                            <span>Sign In</span>
                          </Button>
                        </Link>
                        <Link href="/signup">
                          <Button className="w-full" asChild>
                            <span>Sign Up</span>
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
