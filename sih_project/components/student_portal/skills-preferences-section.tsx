"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText, X } from "lucide-react"

interface SkillsPreferencesSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

const SKILLS_OPTIONS = [
  "Research",
  "Writing",
  "Presentation",
  "Analytical Thinking",
  "Project Participation",
  "Communication",
  "Data Analysis",
  "Report Preparation",
  "Problem Solving",
  "Event Coordination",
  "Policy Understanding",
  "Computer Literacy",
]

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
]

export default function SkillsPreferencesSection({
  onNext,
  onBack,
  onComplete,
  onDataUpdate,
  formData,
}: SkillsPreferencesSectionProps) {
  const [location1, setLocation1] = useState(formData.preferred_location_1 || "")
  const [location2, setLocation2] = useState(formData.preferred_location_2 || "")
  const [companyPref, setCompanyPref] = useState(formData.company_preferences || "")
  const [sector1, setSector1] = useState(formData.sector_preference_1 || "")
  const [sector2, setSector2] = useState(formData.sector_preference_2 || "")
  const [sector3, setSector3] = useState(formData.sector_preference_3 || "")
  const [selectedSkills, setSelectedSkills] = useState<string[]>(formData.skills || [])
  const [certificates, setCertificates] = useState<File[]>(formData.certificates || [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      if (selectedSkills.length < 6) {
        setSelectedSkills([...selectedSkills, skill])
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        (file) => file.type === "application/pdf" || file.type.startsWith("image/")
      )
      setCertificates([...certificates, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    setCertificates(certificates.filter((_, i) => i !== index))
  }

  const handleProceed = () => {
    if (location1 && location2 && sector1 && sector2 && sector3 && selectedSkills.length > 0) {
      onDataUpdate({
        preferred_location_1: location1,
        preferred_location_2: location2,
        company_preferences: companyPref,
        sector_preference_1: sector1,
        sector_preference_2: sector2,
        sector_preference_3: sector3,
        skills: selectedSkills,
        certificates,
      })
      onComplete(6)
      onNext()
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Skills & Preferences</h2>

      <div className="space-y-6">
        {/* Preferred Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Location 1 *</label>
            <select
              value={location1}
              onChange={(e) => setLocation1(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Preferred Location 2 *</label>
            <select
              value={location2}
              onChange={(e) => setLocation2(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Preference */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Company Preference</label>
          <Input
            value={companyPref}
            onChange={(e) => setCompanyPref(e.target.value)}
            placeholder="Enter company preference (text for now)"
          />
        </div>

        {/* Sector Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sector Preference 1 *</label>
            <Input
              value={sector1}
              onChange={(e) => setSector1(e.target.value)}
              placeholder="Enter sector"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sector Preference 2 *</label>
            <Input
              value={sector2}
              onChange={(e) => setSector2(e.target.value)}
              placeholder="Enter sector"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sector Preference 3 *</label>
            <Input
              value={sector3}
              onChange={(e) => setSector3(e.target.value)}
              placeholder="Enter sector"
              required
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Skills * (Select up to 6 skills)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SKILLS_OPTIONS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`px-4 py-2 rounded-md border text-sm transition-all ${
                  selectedSkills.includes(skill)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {selectedSkills.length}/6
          </p>
        </div>

        {/* Certificates Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Certificates (PDF/PNG)</label>
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag & drop certificates here or click to browse
            </p>
          </div>
          {certificates.length > 0 && (
            <div className="space-y-2 mt-4">
              {certificates.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={
            !location1 ||
            !location2 ||
            !sector1 ||
            !sector2 ||
            !sector3 ||
            selectedSkills.length === 0
          }
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Proceed Further
        </Button>
      </div>
    </div>
  )
}