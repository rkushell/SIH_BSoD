"use client"

import { useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import Header from "@/components/internship-portal/header"
import StudentPortalContent from "@/components/student_portal/student-portal-content"

export default function StudentPortalPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="w-full">
        <StudentPortalContent />
      </main>
    </div>
  )
}