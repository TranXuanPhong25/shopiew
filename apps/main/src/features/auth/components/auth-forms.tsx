"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { AnimatedFormWrapper } from "./animated-form-wrapper"
type AuthState = "login" | "register" | "forgot-password"

export function AuthForms({setOpen}: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [authState, setAuthState] = useState<AuthState>("login")
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const handleTransition = (newState: AuthState) => {
    if (newState === authState) return

    setIsTransitioning(true)

    // Fade out current form
    setTimeout(() => {
      setAuthState(newState)
      // Fade in new form
      setTimeout(() => {   
        setIsTransitioning(false)
      }, 50)
    }, 350)
  }

  const switchToRegister = () => {
    handleTransition("register")
  }

  const switchToLogin = () => {
    handleTransition("login")
  }

  const switchToForgotPassword = () => {
    handleTransition("forgot-password")
  }
  const closeForm = () => {
    setOpen(false)
    setAuthState("login")
    setIsTransitioning(false) 
  }
  return (
    <div className="relative w-[700px]  top-0">
      {/* Login Form */}
      <AnimatedFormWrapper
        isVisible={authState === "login" && !isTransitioning}
        animationType="zoom"
        duration={300}
        className="absolute inset-0"
      >
        <LoginForm onSwitchToRegister={switchToRegister}
         onSwitchToForgotPassword={switchToForgotPassword}
         closeForm={closeForm} />
      </AnimatedFormWrapper>

      {/* Register Form */}
      <AnimatedFormWrapper
        isVisible={authState === "register" && !isTransitioning}
        animationType="zoom"
        duration={300}
        className="absolute inset-0"
      >
        <RegisterForm onSwitchToLogin={switchToLogin} />
      </AnimatedFormWrapper>

      {/* Forgot Password Form */}
      <AnimatedFormWrapper
        isVisible={authState === "forgot-password" && !isTransitioning}
        animationType="zoom"
        duration={300}
        className="absolute inset-0"
      >
        <ForgotPasswordForm onSwitchToLogin={switchToLogin} />
      </AnimatedFormWrapper>

    </div>
  )
}
