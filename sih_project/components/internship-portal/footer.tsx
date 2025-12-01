"use client"
import { Mail, Phone, MapPin, Youtube, Linkedin, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-background text-foreground border-t border-border">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Social Media Section */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/channel/UCZqVuyZcSBA6oPB9YAm-cYg/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center transition-colors"
              >
                <Youtube size={20} className="text-primary-foreground" />
              </a>
              <a
                href="https://instagram.com/mca21india"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={20} className="text-primary-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/company/mca21india/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin size={20} className="text-primary-foreground" />
              </a>
              <a
                href="https://twitter.com/MCA21India"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={20} className="text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Get to Know Section */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-foreground">Get to Know</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Partner Companies
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Manuals
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Videos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A Wing, 5th Floor, Shastri Bhawan, Dr Rajendra Prasad Rd, New Delhi-110001
                </p>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:pminternship@mca.gov.in"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  pminternship@mca.gov.in
                </a>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="tel:18001160090"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  1800 11 6090
                </a>
              </div>
            </div>
          </div>

          {/* Download Mobile App Section */}
          <div>
            <h3 className="font-semibold text-base mb-4 text-foreground">Download App</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Click the button below to download the app or scan the QR code.
            </p>
            <div className="flex flex-col gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold">
                GET IT ON Google Play
              </Button>
              <img
                src="/qr-code-play-store.png"
                alt="QR Code for downloading PM Internship app"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider and Copyright */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-center text-muted-foreground text-xs">
          <p>© {currentYear} Prime Minister Internship Scheme (PMIS) | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
