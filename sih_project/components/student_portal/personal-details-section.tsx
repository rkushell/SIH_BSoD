"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PersonalDetailsSectionProps {
  onNext: () => void
  onBack: () => void
  onComplete: (sectionId: number) => void
  onDataUpdate: (data: any) => void
  formData: any
  isLastSection: boolean
}

const GENDER_OPTIONS = ["Male", "Female", "Other"]
const RESERVATION_OPTIONS = ["General", "OBC", "SC", "ST", "EWS"]
const AREA_TYPE_OPTIONS = ["Rural", "Urban"]

export default function PersonalDetailsSection({
  onNext,
  onBack,
  onComplete,
  onDataUpdate,
  formData,
}: PersonalDetailsSectionProps) {
  const [name, setName] = useState(formData.name || "")
  const [gender, setGender] = useState(formData.gender || "")
  const [reservation, setReservation] = useState(formData.reservation_category || "")
  const [address, setAddress] = useState(formData.permanent_address || "")
  const [city, setCity] = useState(formData.city || "")
  const [state, setState] = useState(formData.state || "")
  const [pincode, setPincode] = useState(formData.pincode || "")
  const [areaType, setAreaType] = useState(formData.area_type || "")

  const handleProceed = () => {
    if (name && gender && reservation && address && city && state && pincode && areaType) {
      onDataUpdate({
        name,
        gender,
        reservation_category: reservation,
        permanent_address: address,
        city,
        state,
        pincode,
        area_type: areaType,
      })
      onComplete(2)
      onNext()
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">Personal Details</h2>

      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Name *</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Gender and Reservation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender *</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
            >
              <option value="">Select Gender</option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Reservation Category *</label>
            <select
              value={reservation}
              onChange={(e) => setReservation(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              {RESERVATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Permanent Address *</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your permanent address"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
            required
          />
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">City *</label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">State *</label>
            <Input
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter state"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Pincode *</label>
            <Input
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter pincode"
              maxLength={6}
              required
            />
          </div>
        </div>

        {/* Area Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Area Type *</label>
          <select
            value={areaType}
            onChange={(e) => setAreaType(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm"
          >
            <option value="">Select Area Type</option>
            {AREA_TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-border">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={!name || !gender || !reservation || !address || !city || !state || !pincode || !areaType}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Proceed Further
        </Button>
      </div>
    </div>
  )
}