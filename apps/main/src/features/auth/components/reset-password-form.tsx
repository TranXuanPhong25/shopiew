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
import { CheckCircle, Eye, EyeOff } from "lucide-react"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations"

interface ResetPasswordFormProps extends React.ComponentProps<"div"> {
   token?: string
}

export function ResetPasswordForm({ className, token, ...props }: ResetPasswordFormProps) {
   const [isSubmitted, setIsSubmitted] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const form = useForm<ResetPasswordFormData>({
      resolver: zodResolver(resetPasswordSchema),
      defaultValues: {
         password: "",
         confirmPassword: "",
      },
   })

   const password = form.watch("password")

   const onSubmit = async (data: ResetPasswordFormData) => {
      try {
         // Simulate API call
         await new Promise((resolve, reject) => {
            setTimeout(() => {
               // Simulate random success/failure for demo
               if (Math.random() > 0.9) {
                  reject(new Error("Invalid or expired token"))
               } else {
                  resolve(data)
               }
            }, 2000)
         })

         setIsSubmitted(true)
      } catch (error) {
         form.setError("root", {
            message: "Failed to reset password. Please try again or request a new reset link.",
         })
      }
   }

   const getPasswordStrength = (password: string) => {
      if (!password) return 0
      let strength = 0
      if (password.length >= 8) strength++
      if (/[a-zA-Z]/.test(password)) strength++
      if (/[0-9]/.test(password)) strength++
      if (/[^a-zA-Z0-9]/.test(password)) strength++
      return strength
   }

   const passwordStrength = getPasswordStrength(password || "")

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
                           <h1 className="text-2xl font-bold">Password updated</h1>
                           <p className="text-balance text-muted-foreground">
                              Your password has been successfully updated. You can now sign in with your new password.
                           </p>
                        </div>
                        <Button type="button" className="w-full" onClick={() => (window.location.href = "/login")}>
                           Continue to login
                        </Button>
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
                        <h1 className="text-2xl font-bold">Set new password</h1>
                        <p className="text-balance text-muted-foreground">Enter your new password below</p>
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
                              name="password"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                       <div className="relative">
                                          <Input type={showPassword ? "text" : "password"} {...field} />
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
                                    </FormControl>
                                    {password && password.length > 0 && (
                                       <FormDescription>
                                          <div className="space-y-2">
                                             <div className="flex text-xs">
                                                <span className="text-muted-foreground">Password strength:</span>
                                             </div>
                                             <div className="flex space-x-1">
                                                <div
                                                   className={`h-1 w-1/4 rounded ${passwordStrength >= 1 ? "bg-green-500" : "bg-gray-200"}`}
                                                />
                                                <div
                                                   className={`h-1 w-1/4 rounded ${passwordStrength >= 2 ? "bg-green-500" : "bg-gray-200"}`}
                                                />
                                                <div
                                                   className={`h-1 w-1/4 rounded ${passwordStrength >= 3 ? "bg-green-500" : "bg-gray-200"}`}
                                                />
                                                <div
                                                   className={`h-1 w-1/4 rounded ${passwordStrength >= 4 ? "bg-green-500" : "bg-gray-200"}`}
                                                />
                                             </div>
                                          </div>
                                       </FormDescription>
                                    )}
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                       <div className="relative">
                                          <Input type={showConfirmPassword ? "text" : "password"} {...field} />
                                          <Button
                                             type="button"
                                             variant="ghost"
                                             size="sm"
                                             className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                          >
                                             {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                          </Button>
                                       </div>
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                              {form.formState.isSubmitting ? "Updating..." : "Update password"}
                           </Button>
                        </form>
                     </Form>
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
