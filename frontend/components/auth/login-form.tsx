"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scale, Eye, EyeOff } from "lucide-react"
// import { authenticateUser, type User } from "@/lib/auth"

interface LoginFormProps {
  onLogin: (user: { id: string; email: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
  
    try { // i added this code to connect it to the backend and removed the mock login line that was there for testing
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ Important to send cookies
        body: JSON.stringify({ email, password }),
      })
  
      const data = await res.json()
  
      if (res.ok) {
        onLogin(data.user) // ✅ Pass user data to parent or context
      } else {
        setError(data.message || 'Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Scale className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Legal Archive System</h2>
          <p className="mt-2 text-sm text-gray-600">Magistrate Court Sagamu, Ogun State</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>Enter your credentials to access the legal archive system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</p>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong>Chief Magistrate:</strong> chief.magistrate@sagamucourt.gov.ng
                </p>
                <p>
                  <strong>Magistrate:</strong> magistrate1@sagamucourt.gov.ng
                </p>
                <p>
                  <strong>Court Clerk:</strong> clerk@sagamucourt.gov.ng
                </p>
                <p>
                  <strong>Registry Staff:</strong> registry@sagamucourt.gov.ng
                </p>
                <p>
                  <strong>IT Admin:</strong> admin@sagamucourt.gov.ng
                </p>
                <p className="mt-2">
                  <strong>Password for all:</strong> password123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
