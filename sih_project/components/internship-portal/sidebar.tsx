"use client"

interface SidebarProps {
  onClose: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const sections = [
    { name: "Home", id: "home" },
    { name: "Eligibility", id: "eligibility" },
    { name: "Benefits", id: "benefits" },
    { name: "Sectors", id: "sectors" },
    { name: "Gallery", id: "gallery" },
    { name: "Events", id: "events" },
    { name: "Mobile App", id: "mobile-app" },
  ]

  const handleNavigate = (id: string) => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar */}
      <div className="absolute inset-y-0 left-0 w-64 bg-background border-r border-border shadow-lg">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-8">Navigation</h2>
          <nav className="space-y-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => handleNavigate(section.id)}
                className="block px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                {section.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
