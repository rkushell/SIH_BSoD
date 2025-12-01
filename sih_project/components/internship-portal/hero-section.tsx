"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const [selectedPortal, setSelectedPortal] = useState<"student" | "company" | "admin">("student")
  const router = useRouter()

  const portals = {
    student: {
      label: "Student Portal",
      description: "Access internship opportunities and manage your applications",
      cta: "Proceed to Student Portal",
      route: "/student_portal",
    },
    company: {
      label: "Company Portal",
      description: "Post internship positions and manage your intern candidates",
      cta: "Proceed to Company Portal",
      route: "/company-portal",
    },
    admin: {
      label: "Admin Portal",
      description: "Manage scheme operations and analytics",
      cta: "Proceed to Admin Portal",
      route: "/admin-portal",
    },
  }

  const handleProceed = () => {
    router.push(portals[selectedPortal].route)
  }

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-4xl mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-balance">
            Empowering India's Youth
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore Prime Minister's Internship Scheme opportunities and gain valuable practical experience in leading
            sectors.
          </p>
        </div>

        {/* Portal Selection */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {(Object.keys(portals) as Array<"student" | "company" | "admin">).map((portal) => (
              <button
                key={portal}
                onClick={() => setSelectedPortal(portal)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedPortal === portal
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {portals[portal].label}
              </button>
            ))}
          </div>

          {/* Portal CTA Box */}
          <div className="bg-card border border-border rounded-xl p-8 text-center max-w-md mx-auto">
            <p className="text-muted-foreground text-sm mb-4">{portals[selectedPortal].description}</p>
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              onClick={handleProceed}
            >
              {portals[selectedPortal].cta}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}