"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"

export default function SectorOpportunities() {
  const [showAllSectors, setShowAllSectors] = useState(false)

  const allSectors = [
    "Healthcare",
    "Housing",
    "Infrastructure & Construction",
    "IT and Software Development",
    "Leather and Products",
    "Chemical Industry",
    "Consulting Services",
    "Diversified Conglomerates",
    "FMCG (Fast-Moving Consumer Goods)",
    "Gems & Jewellery",
    "Agriculture and Allied",
    "Automotive",
    "Aviation & Defence",
    "Banking and Financial Services",
    "Cement & Building Materials",
    "Retail & Consumer Durables",
    "Sports",
    "Telecom",
    "Textile Manufacturing",
    "Travel & Hospitality",
    "Manufacturing & Industrial",
    "Media, Entertainment & Education",
    "Metals & Mining",
    "Oil, Gas & Energy",
    "Pharmaceutical",
  ]

  const previewSectors = allSectors.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Opportunities in Various Sectors</h2>
        <p className="text-muted-foreground text-lg">Discover internships across diverse industries</p>
      </div>

      {/* Sectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {previewSectors.map((sector, idx) => (
          <div
            key={idx}
            className="p-8 h-48 flex items-center justify-center text-center rounded-xl border-2 border-primary/40 bg-white/10 dark:bg-white/5 backdrop-blur-md hover:backdrop-blur-lg hover:bg-white/15 dark:hover:bg-white/10 hover:border-primary/60 transition-all duration-300 cursor-pointer group hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {sector}
            </h3>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mb-8">
        <Button variant="outline" size="lg" className="px-8 bg-transparent" onClick={() => setShowAllSectors(true)}>
          Show More Sectors
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {showAllSectors && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-background dark:bg-slate-950 rounded-xl shadow-2xl max-w-4xl w-full max-h-96 flex flex-col border border-border">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-2xl font-bold text-foreground">All Available Sectors</h3>
              <button
                onClick={() => setShowAllSectors(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Horizontally Scrollable Sectors */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-4 p-6 min-w-max">
                {allSectors.map((sector, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3 rounded-full border-2 border-primary/40 hover:border-primary hover:bg-primary/10 transition-all cursor-pointer whitespace-nowrap font-medium text-foreground hover:text-primary flex-shrink-0"
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAllSectors(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
