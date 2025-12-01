"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ConfirmationSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

export default function ConfirmationSection({
  onBack,
  formData,
}: ConfirmationSectionProps) {
  const router = useRouter()

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">Profile Completed Successfully!</h2>
          <p className="text-muted-foreground">
            Thank you for completing your profile. Your information has been saved.
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  )
}