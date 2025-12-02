"use client"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle" // Import the new toggle component

export default function PortalHeader() {
  const router = useRouter()
  const pathname = usePathname()

  const handleHomeClick = () => {
    router.push("/") // Navigates back to the main marketing site
  }

  // Updated navigation items: removed icons and included 'Information'
  const navItems = [
    { href: "/company-portal", label: "Dashboard" },
    { href: "/company-portal/shortlist", label: "Shortlist" },
    { href: "/company-portal/onboarding", label: "Onboarding" },
    { href: "/company-portal/information", label: "Information" }, // New page
  ];

  const handleLogout = () => {
    // Placeholder for actual logout logic
    console.log("Logout button clicked (placeholder)");
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo Section - Exact structure from the main site's header.tsx */}
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-2 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <span className="hidden sm:inline font-semibold text-lg">PMIS</span>
        </button>

        {/* Center: Navigation Tabs (Desktop only) */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-primary transition-colors ${
                pathname === item.href ? 'text-primary font-medium' : 'text-foreground/80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Dark Mode Toggle & Buttons */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
          {/* Dark Mode Toggle - Now using the dedicated component */}
          <ThemeToggle />

          {/* Logout Button */}
          <Button 
            size="sm" 
            variant="destructive"
            onClick={handleLogout}
            className="hidden sm:inline-flex"
          >
            Logout
          </Button>
          
          {/* Mobile Menu Toggle (Placeholder) */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}