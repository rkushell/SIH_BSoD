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

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoginDialog({
  open,
  onOpenChange,
}: LoginDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setEmailError("")
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setEmailError("")
    setPasswordError("")
    
    // Basic validation
    if (!email) {
      setEmailError("Email is required")
      return
    }

    if (!password) {
      setPasswordError("Password is required")
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call when backend is ready
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate login validation
      // When backend is ready, replace with:
      // const response = await fetch('http://localhost:8000/api/students/login/', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
      // const data = await response.json()
      // if (!response.ok) {
      //   if (response.status === 401) {
      //     setPasswordError(data.error || 'Invalid email or password')
      //   } else if (response.status === 404) {
      //     setEmailError('Email not found. Please register first.')
      //   } else {
      //     setEmailError(data.error || 'Login failed. Please try again.')
      //   }
      //   setIsSubmitting(false)
      //   return
      // }

      // Simulate: Check if email exists in database
      // In real implementation, this will be checked via API
      console.log("Login attempt:", { email, password })
      
      // For now, simulate successful login
      // When backend is connected, remove this simulation
      setSubmitSuccess(true)
      
      // Reset form
      setEmail("")
      setPassword("")
      setEmailError("")
      setPasswordError("")
      
      // Close dialog and return to landing page after brief delay
      setTimeout(() => {
        onOpenChange(false)
        setSubmitSuccess(false)
        setIsSubmitting(false)
        
        // Scroll to top of landing page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 1500)
      
    } catch (error) {
      console.error("Login error:", error)
      setEmailError("Network error. Please check your connection and try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Login</DialogTitle>
          <DialogDescription>
            Sign in to access your account and manage your internship applications.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="login-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              disabled={isSubmitting}
              className={emailError ? "border-destructive focus-visible:ring-destructive/20" : ""}
            />
            {/* Email Error Message */}
            {emailError && (
              <p className="text-sm text-destructive mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="login-password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                className={`pr-10 ${passwordError ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
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
            {/* Password Error Message */}
            {passwordError && (
              <p className="text-sm text-destructive mt-1">{passwordError}</p>
            )}
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                ✓ Login successful! Redirecting...
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
                setEmailError("")
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
              disabled={!!emailError || !!passwordError || isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}