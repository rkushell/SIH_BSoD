"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react"

export default function GalleryEvents() {
  const router = useRouter()

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Software Developer",
      company: "Tech Innovations Inc",
      text: "The PMIS gave me the perfect opportunity to kickstart my career. The mentorship and real-world experience were invaluable.",
      initial: "A",
    },
    {
      name: "Priya Verma",
      role: "Product Manager",
      company: "Digital Solutions Ltd",
      text: "Incredible platform and amazing learning opportunities. I developed skills that made me job-ready within months.",
      initial: "P",
    },
    {
      name: "Rohit Kumar",
      role: "Data Analyst",
      company: "Analytics Pro",
      text: "The internship bridged the gap between classroom knowledge and industry requirements perfectly.",
      initial: "R",
    },
  ]

  const events = [
    {
      id: "1",
      title: "Internship Orientation",
      date: "January 15, 2025",
      location: "Virtual Event",
      image: "/internship-orientation-event.jpg",
    },
    {
      id: "2",
      title: "Industry Expert Webinar",
      date: "January 22, 2025",
      location: "Online",
      image: "/industry-expert-webinar.jpg",
    },
    {
      id: "3",
      title: "Internship Job Fair",
      date: "February 1, 2025",
      location: "New Delhi",
      image: "/internship-job-fair.jpg",
    },
  ]

  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleViewEvent = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Gallery</h2>

      <Tabs defaultValue="testimonials" className="w-full">
        <TabsList className="grid w-full max-w-sm grid-cols-2 mb-8">
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-6">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${testimonialIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <Card className="border border-border">
                      <CardContent className="p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                            {testimonial.initial}
                          </div>
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg text-foreground mb-6 italic">"{testimonial.text}"</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 md:-translate-x-16 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 md:translate-x-16 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === testimonialIndex ? "bg-primary w-8" : "bg-muted"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-3">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                    onClick={() => handleViewEvent(event.id)}
                  >
                    View Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
