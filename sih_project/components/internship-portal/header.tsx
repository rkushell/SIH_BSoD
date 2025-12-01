"use client"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import RegistrationDialog from "@/components/ui/registration-dialog"
import LoginDialog from "@/components/ui/login-dialog"

interface HeaderProps {
  isDark: boolean
  toggleDarkMode: () => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ isDark, toggleDarkMode, sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleHomeClick = () => {
    router.push("/")
  }

  const isHomePage = pathname === "/"

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo Section - Clickable */}
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="hidden sm:inline font-semibold text-lg">PMIS</span>
          </button>

          {/* Center: Navigation (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center text-sm">
            {isHomePage ? (
              <a href="#home" className="hover:text-primary transition-colors">
                Home
              </a>
            ) : (
              <button
                onClick={handleHomeClick}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
            )}
            {isHomePage && (
              <>
                <a href="#eligibility" className="hover:text-primary transition-colors">
                  Eligibility
                </a>
                <a href="#sectors" className="hover:text-primary transition-colors">
                  Sectors
                </a>
                <a href="#gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </>
            )}
          </nav>

          {/* Right Section: Dark Mode Toggle & Buttons */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setLoginOpen(true)}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setRegistrationOpen(true)}
              >
                Register
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden rounded-full"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <LoginDialog 
        open={loginOpen} 
        onOpenChange={setLoginOpen} 
      />

      {/* Registration Dialog */}
      <RegistrationDialog 
        open={registrationOpen} 
        onOpenChange={setRegistrationOpen} 
      />
    </>
  )
}