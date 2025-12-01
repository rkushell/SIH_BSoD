"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText } from "lucide-react"

interface BankDetailsSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

export default function BankDetailsSection({
  onNext,
  onBack,
  onComplete,
  onDataUpdate,
  formData,
}: BankDetailsSectionProps) {
  const [income, setIncome] = useState(formData.family_income || "")
  const [itrFile, setItrFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItrFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setItrFile(e.dataTransfer.files[0])
    }
  }

  const handleProceed = () => {
    if (income && parseFloat(income) >= 0 && parseFloat(income) <= 800000) {
      onDataUpdate({ family_income: income, itrFile })
      onComplete(5)
      onNext()
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Bank Details</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Family Income (₹) *</label>
          <Input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter annual family income"
            min="0"
            max="800000"
            required
          />
          <p className="text-xs text-muted-foreground">Maximum: ₹8,00,000</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Income Tax Report (PDF) *</label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            {itrFile ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <FileText className="w-5 h-5" />
                <span>{itrFile.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop ITR PDF here or click to browse
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={!income || parseFloat(income) < 0 || parseFloat(income) > 800000}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Proceed Further
        </Button>
      </div>
    </div>
  )
}