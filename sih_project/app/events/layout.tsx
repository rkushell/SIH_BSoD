"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import Header from "@/components/internship-portal/header"
import Sidebar from "@/components/internship-portal/sidebar"
import Footer from "@/components/internship-portal/footer"

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && <Sidebar onClose={closeSidebar} />}

      <main className="w-full">{children}</main>

      <Footer />
    </div>
  )
}
