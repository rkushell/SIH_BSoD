"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"

const eventDetails: Record<
  string,
  {
    title: string
    date: string
    location: string
    description: string
    attendees: number
    agenda: string[]
  }
> = {
  "1": {
    title: "Internship Orientation",
    date: "January 15, 2025",
    location: "Virtual Event",
    description:
      "Join us for the official PMIS internship orientation where you'll meet program coordinators, learn about expectations, and network with fellow interns from across India.",
    attendees: 5000,
    agenda: [
      "Welcome & Introduction to PMIS",
      "Program Overview and Benefits",
      "Internship Guidelines & Rules",
      "Mentor Assignment Process",
      "Q&A Session",
    ],
  },
  "2": {
    title: "Industry Expert Webinar",
    date: "January 22, 2025",
    location: "Online",
    description:
      "Learn from industry leaders and subject matter experts as they share insights on career development, skill building, and emerging trends in various sectors.",
    attendees: 3200,
    agenda: [
      "Industry Trends and Opportunities",
      "Career Pathways in Tech",
      "Building Professional Skills",
      "Networking Roundtable",
      "Live Q&A with Experts",
    ],
  },
  "3": {
    title: "Internship Job Fair",
    date: "February 1, 2025",
    location: "New Delhi",
    description:
      "Connect directly with leading companies and organizations offering internship opportunities. This is your chance to network, learn about roles, and secure your internship placement.",
    attendees: 8000,
    agenda: [
      "Company Showcase Booths",
      "Resume Review Sessions",
      "One-on-One Interviews",
      "Networking Lunch",
      "Closing Ceremony",
    ],
  },
}

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const event = eventDetails[eventId]

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">Sorry, we couldn't find the event you're looking for.</p>
            <Button onClick={() => router.back()} className="w-full">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 p-0 h-auto text-primary hover:text-primary/90"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">{event.date}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">{event.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Expected Attendees</p>
                  <p className="font-semibold text-foreground">{event.attendees.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Description */}
        <Card className="border border-border mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">About This Event</h2>
            <p className="text-lg text-foreground leading-relaxed">{event.description}</p>
          </CardContent>
        </Card>

        {/* Agenda */}
        <Card className="border border-border">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Event Agenda</h2>
            <div className="space-y-3">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-3 border-b border-border last:border-b-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-foreground pt-1">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
