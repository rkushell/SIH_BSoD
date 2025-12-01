"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, Award, GraduationCap, TrendingUp, Zap, Building2, CheckCircle2 } from "lucide-react"

export default function EligibilityBenefits() {
  const eligibility = [
    {
      title: "Age",
      icon: Users,
      description: "21-24 years",
    },
    {
      title: "Job Status",
      icon: Briefcase,
      description: "First-time job seeker",
    },
    {
      title: "Education",
      icon: GraduationCap,
      description: "12th pass or higher",
    },
    {
      title: "Family",
      icon: CheckCircle2,
      description: "Family income limit: ₹8 lakh p.a.",
    },
  ]

  const benefits = [
    {
      title: "12 Months",
      icon: TrendingUp,
      description: "Duration of internship experience",
    },
    {
      title: "Monthly Assistance",
      icon: Award,
      description: "₹500/month stipend provided",
    },
    {
      title: "One-time Grant",
      icon: Zap,
      description: "₹100,000 completion bonus",
    },
    {
      title: "Multiple Sectors",
      icon: Building2,
      description: "Choose from various industries",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
        {/* Eligibility Column */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Are you Eligible?</h2>
          <div className="grid grid-cols-2 gap-4">
            {eligibility.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx} className="border border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Benefits Column */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Core Benefits Only For You</h2>
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((item, idx) => {
              const Icon = item.icon
              return (
                <Card key={idx} className="border border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
