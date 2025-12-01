"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ContactDetailsSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

export default function ContactDetailsSection({
  onNext,
  onBack,
  onComplete,
  onDataUpdate,
  formData,
}: ContactDetailsSectionProps) {
  const [phone, setPhone] = useState(formData.phone_number || "")
  const [email, setEmail] = useState(formData.email || "")

  const handleProceed = () => {
    if (phone && email && phone.length === 10) {
      onDataUpdate({ phone_number: phone, email })
      onComplete(3)
      onNext()
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number *</label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            required
          />
          {phone && phone.length !== 10 && (
            <p className="text-sm text-destructive">Phone number must be 10 digits</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email ID *</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={!phone || !email || phone.length !== 10}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Proceed Further
        </Button>
      </div>
    </div>
  )
}