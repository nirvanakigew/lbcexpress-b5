"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function EnvChecker() {
  // Check if we're in the browser
  if (typeof window === "undefined") return null

  const missingVars = []

  // Check for Supabase environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missingVars.push("NEXT_PUBLIC_SUPABASE_URL")
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missingVars.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  // If no missing vars, don't show anything
  if (missingVars.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        <p>The following environment variables are missing:</p>
        <ul className="list-disc pl-5 mt-2">
          {missingVars.map((variable) => (
            <li key={variable}>{variable}</li>
          ))}
        </ul>
        <p className="mt-2">
          Please add these to your <code>.env.local</code> file or Vercel project settings.
        </p>
      </AlertDescription>
    </Alert>
  )
}
