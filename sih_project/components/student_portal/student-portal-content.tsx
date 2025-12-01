"use client"

import { useState } from "react"
import ProfileTimeline from "./profile-timeline"
import EKycSection from "./e-kyc-section"
import PersonalDetailsSection from "./personal-details-section"
import ContactDetailsSection from "./contact-details-section"
import EducationDetailsSection from "./education-details-section"
import BankDetailsSection from "./bank-details-section"
import SkillsPreferencesSection from "./skills-preferences-section"
import ConfirmationSection from "./confirmation-section"

const SECTIONS = [
  { id: 1, name: "e-KYC", component: EKycSection },
  { id: 2, name: "Personal Details", component: PersonalDetailsSection },
  { id: 3, name: "Contact Details", component: ContactDetailsSection },
  { id: 4, name: "Education Details", component: EducationDetailsSection },
  { id: 5, name: "Bank Details", component: BankDetailsSection },
  { id: 6, name: "Skills & Preferences", component: SkillsPreferencesSection },
]

export default function StudentPortalContent() {
  const [currentSection, setCurrentSection] = useState(1)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [formData, setFormData] = useState<any>({})

  const handleNext = () => {
    if (currentSection < SECTIONS.length) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handleBack = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSectionComplete = (sectionId: number) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId])
    }
  }

  const handleDataUpdate = (data: any) => {
    setFormData({ ...formData, ...data })
  }

  const CurrentComponent = SECTIONS.find(s => s.id === currentSection)?.component || ConfirmationSection

  return (
    <div className="w-full py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Candidate Profile</h1>
          <p className="text-muted-foreground">Complete your profile to access internship opportunities</p>
        </div>

        {/* Timeline */}
        <ProfileTimeline
          sections={SECTIONS}
          currentSection={currentSection}
          completedSections={completedSections}
        />

        {/* Current Section */}
        <div className="mt-8">
          <CurrentComponent
            onNext={handleNext}
            onBack={handleBack}
            onComplete={handleSectionComplete}
            onDataUpdate={handleDataUpdate}
            formData={formData}
            isLastSection={currentSection === SECTIONS.length}
          />
        </div>
      </div>
    </div>
  )
}