"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface RegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function RegistrationDialog({
  open,
  onOpenChange,
}: RegistrationDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validate passwords match in real-time
  const validatePasswords = (pass: string, confirm: string) => {
    if (confirm.length === 0) {
      setPasswordError("")
      return true
    }
    if (pass !== confirm) {
      setPasswordError("Passwords do not match")
      return false
    }
    setPasswordError("")
    return true
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    validatePasswords(value, confirmPassword)
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    validatePasswords(password, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Final validation before submission
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("Please enter both password fields")
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call when backend is ready
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate successful registration
      // When backend is ready, replace with:
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // if (!response.ok) throw new Error('Registration failed')

      console.log("Registration:", { email, password })
      
      // Show success message
      setSubmitSuccess(true)
      
      // Reset form
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setPasswordError("")
      
      // Close dialog and return to landing page after brief delay
      setTimeout(() => {
        onOpenChange(false)
        setSubmitSuccess(false)
        setIsSubmitting(false)
        
        // Scroll to top of landing page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 1500) // Show success message for 1.5 seconds
      
    } catch (error) {
      console.error("Registration error:", error)
      setPasswordError("Registration failed. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Account</DialogTitle>
          <DialogDescription>
            Register to access internship opportunities and manage your applications.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                className="pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isSubmitting}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                required
                className={`pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                disabled={isSubmitting}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {/* Error Message */}
            {passwordError && (
              <p className="text-sm text-destructive mt-1">{passwordError}</p>
            )}
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                ✓ Registration successful! Returning to home...
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                onOpenChange(false)
                // Reset form when closing
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setPasswordError("")
                setSubmitSuccess(false)
                setIsSubmitting(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!!passwordError || isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}