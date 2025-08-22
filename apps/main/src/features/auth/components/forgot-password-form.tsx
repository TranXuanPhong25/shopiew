"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations"

interface ForgotPasswordFormProps extends React.ComponentProps<"div"> {
  onSwitchToLogin: () => void
}

export function ForgotPasswordForm({ className, onSwitchToLogin, ...props }: ForgotPasswordFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.9) {
            reject(new Error("Email not found"))
          } else {
            resolve(data)
          }
        }, 2000)
      })

      setSubmittedEmail(data.email)
      setIsSubmitted(true)
    } catch (error) {
      form.setError("root", {
        message: "Email not found. Please check your email address and try again.",
      })
    }
  }

  const handleBackToLogin = () => {
    setIsSubmitted(false)
    setSubmittedEmail("")
    form.reset()
    onSwitchToLogin()
  }

  const handleTryAgain = () => {
    setIsSubmitted(false)
    setSubmittedEmail("")
    form.reset()
  }

  if (isSubmitted) {
    return (
      <div className={cn("flex flex-col gap-6 animate-in fade-in-0 zoom-in-95 duration-300", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6 items-center text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h1 className="text-2xl font-bold">Check your email</h1>
                  <p className="text-balance text-muted-foreground">
                    We&apos;ve sent a password reset link to <strong>{submittedEmail}</strong>
                  </p>
                </div>
                <div className="space-y-4 w-full">
                  <p className="text-sm text-muted-foreground">
                    Didn&apos;t receive the email? Check your spam folder or try again.
                  </p>
                  <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleTryAgain}>
                    Try again
                  </Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={handleBackToLogin}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative hidden bg-muted md:block">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Image"
                width={500}
                height={500}
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6 animate-in fade-in-0 zoom-in-95 duration-300", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {form.formState.errors.root && (
                    <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                      {form.formState.errors.root.message}
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormDescription>{"We'll send a password reset link to this email address."}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to login
                </button>
              </div>
            </div>
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/openart-image_67zyInZh_1752624607623_raw.svg"
              alt="Image"
              width={700}
              height={600}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
