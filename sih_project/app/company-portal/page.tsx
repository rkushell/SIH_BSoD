"use client"

import { useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import Header from "@/components/internship-portal/header"
import CompanyAuthDialog from "@/components/ui/company-auth-dialog"
// Try relative import instead
import CompanyPortalContent from "../../components/company-portal/company-portal-content"

export default function CompanyPortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="w-full">
        {isAuthenticated ? (
          <CompanyPortalContent />
        ) : (
          <div className="w-full py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Company Portal</h1>
              <p className="text-muted-foreground">
                Please authenticate to access your company portal
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Authentication Dialog */}
      <CompanyAuthDialog
        open={authDialogOpen && !isAuthenticated}
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  )
}