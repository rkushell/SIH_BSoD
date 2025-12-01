"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface EducationDetailsSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

const QUALIFICATION_OPTIONS = ["10th", "12th", "ITI", "Diploma", "UG"]

export default function EducationDetailsSection({
  onNext,
  onBack,
  onComplete,
  onDataUpdate,
  formData,
}: EducationDetailsSectionProps) {
  const [qualification, setQualification] = useState(formData.highest_qualification || "")
  const [percentage, setPercentage] = useState(formData.percentage || "")
  const [gpa, setGpa] = useState(formData.gpa || "")
  const [institute, setInstitute] = useState(formData.education_institute || "")

  const needsPercentage = ["10th", "12th", "ITI"].includes(qualification)
  const needsBoth = qualification === "Diploma"
  const needsGPA = ["Diploma", "UG"].includes(qualification)

  const handleProceed = () => {
    if (qualification && institute) {
      if (needsPercentage && !percentage) return
      if (needsBoth && (!percentage || !gpa)) return
      if (qualification === "UG" && !gpa) return

      onDataUpdate({
        highest_qualification: qualification,
        percentage: percentage || null,
        gpa: gpa || null,
        education_institute: institute,
      })
      onComplete(4)
      onNext()
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Education Details</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Highest Qualification *</label>
          <select
            value={qualification}
            onChange={(e) => {
              setQualification(e.target.value)
              setPercentage("")
              setGpa("")
            }}
            className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
          >
            <option value="">Select Qualification</option>
            {QUALIFICATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {needsPercentage && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Percentage *</label>
            <Input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
              min="0"
              max="100"
              step="0.01"
              required
            />
          </div>
        )}

        {needsGPA && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">GPA *</label>
            <Input
              type="number"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              placeholder="Enter GPA"
              min="0"
              max="10"
              step="0.01"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Educational Institute *</label>
          <Input
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            placeholder="Enter institute name"
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
          disabled={
            !qualification ||
            !institute ||
            (needsPercentage && !percentage) ||
            (needsBoth && (!percentage || !gpa)) ||
            (qualification === "UG" && !gpa)
          }
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Proceed Further
        </Button>
      </div>
    </div>
  )
}