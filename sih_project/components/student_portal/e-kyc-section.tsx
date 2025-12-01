"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Upload, FileText } from "lucide-react"

interface EKycSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

export default function EKycSection({
  onNext,
  onBack,
  onComplete,
  onDataUpdate,
  formData,
}: EKycSectionProps) {
  const [aadharNumber, setAadharNumber] = useState(formData.aadharNumber || "")
  const [showAadhar, setShowAadhar] = useState(false)
  const [aadharFile, setAadharFile] = useState<File | null>(null)
  const [consent, setConsent] = useState(false)
  const [showDigilocker, setShowDigilocker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadharFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAadharFile(e.dataTransfer.files[0])
    }
  }

  const handleProceed = () => {
    if (aadharNumber && consent) {
      onDataUpdate({ aadharNumber, aadharFile })
      onComplete(1)
      onNext()
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <div className="flex gap-4 mb-6 border-b border-border">
        <button
          onClick={() => setShowDigilocker(false)}
          className={`pb-4 px-4 border-b-2 transition-colors ${
            !showDigilocker
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Aadhaar e-KYC
        </button>
        <button
          onClick={() => setShowDigilocker(true)}
          className={`pb-4 px-4 border-b-2 transition-colors flex items-center gap-2 ${
            showDigilocker
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-muted-foreground"
          }`}
        >
          Digilocker
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
            i
          </span>
        </button>
      </div>

      {!showDigilocker ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Aadhaar based e-KYC</h2>

          <div className="space-y-6">
            {/* Aadhaar Number Input */}
            <div className="space-y-2">
              <label htmlFor="aadhar" className="text-sm font-medium text-foreground">
                Aadhaar Number/Virtual ID *
              </label>
              <div className="relative">
                <Input
                  id="aadhar"
                  type={showAadhar ? "text" : "password"}
                  placeholder="Enter your Aadhaar Number/Virtual ID"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  className="pr-10"
                  maxLength={12}
                />
                <button
                  type="button"
                  onClick={() => setShowAadhar(!showAadhar)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showAadhar ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Upload Aadhaar Document (PDF)</label>
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
                {aadharFile ? (
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <FileText className="w-5 h-5" />
                    <span>{aadharFile.name}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Drag & drop your Aadhaar PDF here or click to browse
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-foreground">
                I consent to the use of my Aadhaar details for PM Internship Scheme.{" "}
                <a href="#" className="text-primary hover:underline">
                  Read full consent here
                </a>
              </label>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Digilocker</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded p-4 space-y-2">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Note:-</p>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Digilocker is a digital document storage platform. You can access your documents at{" "}
              <a href="https://www.digilocker.gov.in" className="underline" target="_blank">
                https://www.digilocker.gov.in
              </a>
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded p-4 space-y-2">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Note:-</p>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              For support, visit{" "}
              <a href="https://support.digilocker.gov.in" className="underline" target="_blank">
                https://support.digilocker.gov.in
              </a>
            </p>
          </div>
          <Button
            onClick={() => setShowDigilocker(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Proceed Further
          </Button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={!aadharNumber || !consent || showDigilocker}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Proceed Further
        </Button>
      </div>
    </div>
  )
}