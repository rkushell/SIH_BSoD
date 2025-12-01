"use client"

import { useState } from "react"
import { useTheme } from "@/hooks/use-theme"
import Header from "@/components/internship-portal/header"
import Sidebar from "@/components/internship-portal/sidebar"
import HeroSection from "@/components/internship-portal/hero-section"
import EligibilityBenefits from "@/components/internship-portal/eligibility-benefits"
import SectorOpportunities from "@/components/internship-portal/sector-opportunities"
import GalleryEvents from "@/components/internship-portal/gallery-events"
import MobileAppBanner from "@/components/internship-portal/mobile-app-banner"
import Footer from "@/components/internship-portal/footer"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggleDarkMode } = useTheme()

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar */}
      {sidebarOpen && <Sidebar onClose={closeSidebar} />}

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <section id="home" className="w-full">
          <HeroSection />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* Eligibility & Benefits Section */}
        <section id="eligibility" className="w-full py-16 md:py-24 px-4 md:px-8">
          <EligibilityBenefits />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* Sector Opportunities */}
        <section id="sectors" className="w-full py-16 md:py-24 px-4 md:px-8">
          <SectorOpportunities />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* Gallery & Events */}
        <section id="gallery" className="w-full py-16 md:py-24 px-4 md:px-8">
          <GalleryEvents />
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-border" />

        {/* Mobile App Banner */}
        <section id="mobile-app" className="w-full">
          <MobileAppBanner />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
