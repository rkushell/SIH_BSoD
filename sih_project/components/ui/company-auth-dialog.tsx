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

interface CompanyAuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export default function CompanyAuthDialog({
  open,
  onOpenChange,
  onSuccess,
}: CompanyAuthDialogProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [companyName, setCompanyName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [companyNameError, setCompanyNameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value)
    setCompanyNameError("")
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setPasswordError("")
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (value && value !== password) {
      setPasswordError("Passwords do not match")
    } else {
      setPasswordError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setCompanyNameError("")
    setPasswordError("")
    
    // Validation
    if (!companyName) {
      setCompanyNameError("Company name is required")
      return
    }

    if (!password) {
      setPasswordError("Password is required")
      return
    }

    if (mode === "register") {
      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long")
        return
      }
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match")
        return
      }
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call when backend is ready
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate authentication
      // When backend is ready, replace with:
      // const endpoint = mode === "register" 
      //   ? "http://localhost:8000/api/companies/register/"
      //   : "http://localhost:8000/api/companies/login/"
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ company_name: companyName, password }),
      // })
      // const data = await response.json()
      // if (!response.ok) {
      //   if (response.status === 409) {
      //     setCompanyNameError(data.error || 'Company already registered')
      //   } else if (response.status === 401) {
      //     setPasswordError(data.error || 'Invalid company name or password')
      //   } else {
      //     setCompanyNameError(data.error || 'Authentication failed')
      //   }
      //   setIsSubmitting(false)
      //   return
      // }

      console.log(`${mode === "register" ? "Registration" : "Login"}:`, { companyName, password })
      
      // Success
      setSubmitSuccess(true)
      
      // Reset form
      setCompanyName("")
      setPassword("")
      setConfirmPassword("")
      setCompanyNameError("")
      setPasswordError("")
      
      // Close dialog and proceed after brief delay
      setTimeout(() => {
        onOpenChange(false)
        setSubmitSuccess(false)
        setIsSubmitting(false)
        onSuccess()
      }, 1500)
      
    } catch (error) {
      console.error("Authentication error:", error)
      setCompanyNameError("Network error. Please check your connection and try again.")
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setCompanyName("")
    setPassword("")
    setConfirmPassword("")
    setCompanyNameError("")
    setPasswordError("")
    setSubmitSuccess(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === "login" ? "Company Login" : "Company Registration"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Sign in to access your company portal and manage internship opportunities."
              : "Register your company to start posting internship positions."}
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          <button
            type="button"
            onClick={() => {
              setMode("login")
              resetForm()
            }}
            className={`flex-1 pb-3 px-4 border-b-2 transition-colors ${
              mode === "login"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register")
              resetForm()
            }}
            className={`flex-1 pb-3 px-4 border-b-2 transition-colors ${
              mode === "register"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Company Name Field */}
          <div className="space-y-2">
            <label htmlFor="company-name" className="text-sm font-medium text-foreground">
              Company Name *
            </label>
            <Input
              id="company-name"
              type="text"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => handleCompanyNameChange(e.target.value)}
              required
              disabled={isSubmitting}
              className={companyNameError ? "border-destructive focus-visible:ring-destructive/20" : ""}
            />
            {companyNameError && (
              <p className="text-sm text-destructive mt-1">{companyNameError}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="company-password" className="text-sm font-medium text-foreground">
              Password *
            </label>
            <div className="relative">
              <Input
                id="company-password"
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
          </div>

          {/* Confirm Password Field (Only for Register) */}
          {mode === "register" && (
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
                Confirm Password *
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
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
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {passwordError && (
            <p className="text-sm text-destructive mt-1">{passwordError}</p>
          )}

          {/* Success Message */}
          {submitSuccess && (
            <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200 font-medium">
                ✓ {mode === "register" ? "Registration" : "Login"} successful! Redirecting...
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
                resetForm()
                setIsSubmitting(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!!companyNameError || !!passwordError || isSubmitting}
            >
              {isSubmitting
                ? mode === "register"
                  ? "Registering..."
                  : "Logging in..."
                : mode === "register"
                ? "Register"
                : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}