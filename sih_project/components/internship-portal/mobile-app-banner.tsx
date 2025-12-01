"use client"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function MobileAppBanner() {
  return (
    <section className="w-full bg-primary/5 border-y border-border py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Download PMIS Mobile Application</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stay connected and manage your internship on the go with our official mobile application. Track
              applications, receive notifications, and access resources anytime, anywhere.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                onClick={() =>
                  window.open("https://play.google.com/store/apps/details?id=com.mca.pm_internship&pli=1", "_blank")
                }
              >
                <Download className="w-5 h-5" />
                Get it on Google Play
              </Button>
            </div>
          </div>

          {/* Right: App Mockup & QR Code */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Phone Mockups */}
            <div className="flex items-center justify-center">
              <img src="/download-pmis-prototype.png" alt="PMIS Mobile App Prototype" className="max-w-full h-auto" />
            </div>

            {/* QR Code */}
            <div className="bg-card border-2 border-border p-6 rounded-xl">
              <p className="text-sm text-muted-foreground text-center mb-3 font-semibold">Scan to Download</p>
              <img src="/qr-code-play-store.png" alt="Download QR Code" className="w-32 h-32" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
