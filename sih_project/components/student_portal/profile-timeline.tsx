"use client"

import { Check } from "lucide-react"

interface Section {
  id: number
  name: string
}

interface ProfileTimelineProps {
  sections: Section[]
  currentSection: number
  completedSections: number[]
}

export default function ProfileTimeline({
  sections,
  currentSection,
  completedSections,
}: ProfileTimelineProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between overflow-x-auto pb-4">
        {sections.map((section, index) => {
          const isCompleted = completedSections.includes(section.id)
          const isCurrent = currentSection === section.id
          const isPast = currentSection > section.id

          return (
            <div key={section.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                      ? "bg-primary border-primary text-primary-foreground"
                      : "bg-background border-border text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-semibold">{section.id}</span>
                  )}
                </div>
                {/* Label */}
                <span
                  className={`text-xs mt-2 text-center whitespace-nowrap ${
                    isCurrent ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {section.name}
                </span>
              </div>
              {/* Connector Line */}
              {index < sections.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-0.5 mx-2 transition-all ${
                    isPast || isCompleted ? "bg-green-500" : "bg-border"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}