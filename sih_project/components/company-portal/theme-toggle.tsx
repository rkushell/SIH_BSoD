"use client"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button" 

export function ThemeToggle() {
  // 1. Add state to track if the component has mounted on the client
  const [mounted, setMounted] = React.useState(false) 
  const { setTheme, theme } = useTheme()

  // 2. Set mounted to true only after the client has hydrated
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 3. Prevent rendering theme-dependent logic on the server
  if (!mounted) {
    // Render a non-theme-dependent placeholder element 
    // to ensure stable HTML structure during SSR.
    return (
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Toggle dark mode"
        >
          {/* Placeholder element for consistent height/width */}
          <div className="w-5 h-5" /> 
        </Button>
    )
  }

  // 4. Once mounted (client-side), render the actual logic
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full"
      aria-label="Toggle dark mode"
    >
      {/* This conditional rendering is now safe on the client */}
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}