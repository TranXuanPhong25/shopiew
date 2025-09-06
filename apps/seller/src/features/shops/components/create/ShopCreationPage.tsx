/**
 * Main shop creation page component
 */
"use client"

import React, { useRef, useState, useEffect } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useShopCreationStore } from '../../../../stores/shop-creation-store'
import { SHOP_CREATION_STEPS, TOTAL_STEPS, getStepDescription } from '../../constants'
import { BasicInfoStepRHF, StepRef } from './steps/BasicInfoStepRHF'
import { ContactStepRHF } from './steps/ContactStepRHF'
import { FinishStep } from './steps/FinishStep'
import { ShopCreationSuccess } from './ShopCreationSuccess'

export function ShopCreationPage() {
   const {
      currentStep,
      shopData,
      isSubmitting,
      isCompleted,
      prevStep,
      goToStep,
      submitForm,
   } = useShopCreationStore()

   // Create refs for each step component
   const basicInfoRef = useRef<StepRef>(null)
   const contactRef = useRef<StepRef>(null)
   const finishRef = useRef<StepRef>(null)

   // State to track current step validation in real-time
   const [isCurrentStepValid, setIsCurrentStepValid] = useState(false)

   const currentStepData = SHOP_CREATION_STEPS[currentStep]

   // Get current step ref
   const getCurrentStepRef = () => {
      switch (currentStep) {
         case 0:
            return basicInfoRef
         case 1:
            return contactRef
         case 2:
            return finishRef
         default:
            return null
      }
   }

   // Update validation state whenever step changes or validation changes
   useEffect(() => {
      const checkValidation = () => {
         const stepRef = getCurrentStepRef()
         const isValid = stepRef?.current?.isValid ?? false
         setIsCurrentStepValid(isValid)
      }

      // Check immediately
      checkValidation()

      // Set up interval to check validation periodically
      //TODO: Optimize this with events or better state management
      const interval = setInterval(checkValidation, 100)

      return () => clearInterval(interval)
   }, [currentStep])

   // Save current step data before navigation
   const saveCurrentStepData = () => {
      const stepRef = getCurrentStepRef()
      if (stepRef?.current) {
         // Get current form values and save to store
         stepRef.current.saveData?.()
      }
   }

   // Handle next step
   const handleNext = () => {
      const stepRef = getCurrentStepRef()
      if (stepRef?.current) {
         stepRef.current.submit()
      }
   }

   // Handle step navigation with data saving
   const handleGoToStep = (targetStep: number) => {
      saveCurrentStepData()
      goToStep(targetStep)
   }

   // Handle previous step with data saving
   const handlePrevious = () => {
      saveCurrentStepData()
      prevStep()
   }

   // Function to check if a step is completed (simplified - will use RHF validation)
   const isStepCompleted = (stepIndex: number): boolean => {
      // For timeline display only - actual validation handled by RHF
      switch (stepIndex) {
         case 0: // Basic Info
            return !!(shopData.shopName.trim() && shopData.location.trim())
         case 1: // Contact
            return !!shopData.email.trim()
         case 2: // Finish
            return false // Finish step is never "completed" until shop is created
         default:
            return false
      }
   }

   // Function to check if a step can be accessed
   const canAccessStep = (stepIndex: number): boolean => {
      if (stepIndex <= currentStep) {
         return true // Can always go back to current or previous steps
      }
      
      // Can only go forward if all previous steps are completed
      for (let i = 0; i < stepIndex; i++) {
         if (!isStepCompleted(i)) {
            return false
         }
      }
      return true
   }

   const renderStepContent = () => {
      switch (currentStepData.id) {
         case "basic":
            return <BasicInfoStepRHF ref={basicInfoRef} />
         case "contact":
            return <ContactStepRHF ref={contactRef} />
         case "finish":
            return <FinishStep ref={finishRef} />
         default:
            return null
      }
   }

   if (isCompleted) {
      return <ShopCreationSuccess />
   }

   return (
      <div className="min-h-screen bg-gray-50 ">
         <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Shop</h1>
               <p className="text-gray-600">Set up your online store in just a few steps</p>
            </div>

            {/* Header Actions */}
            <div className="mb-8">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                     Step {currentStep + 1} of {TOTAL_STEPS}
                  </span>
               </div>
            </div>

            {/* Timeline Steps Navigation */}
            <div className="mb-8 ">
               <div className="relative ">
                  {/* Steps Container */}
                  <div className="flex items-start justify-between">
                     {SHOP_CREATION_STEPS.map((step, index) => {
                        const Icon = step.icon
                        const isAccessible = canAccessStep(index)
                        const isCompleted = isStepCompleted(index)
                        const isCurrent = index === currentStep
                        const isLastStep = index === TOTAL_STEPS - 1
                        
                        return (
                           <div 
                              key={step.id}
                              className={`flex items-center relative ${isLastStep ? '' : 'flex-1'}`}
                           >
                              {/* Step Content */}
                              <div className="flex flex-col items-center z-10">
                                 {/* Step Circle */}
                                 <div
                                    className={`
                                       w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center
                                       transition-all duration-300 ease-in-out cursor-pointer
                                       ${isCurrent 
                                          ? "bg-orange-500 border-orange-500 text-white shadow-lg" 
                                          : isCompleted 
                                             ? "bg-orange-500 border-orange-500 text-white" 
                                             : isAccessible
                                                ? "bg-white border-gray-300 text-gray-600 hover:border-orange-400"
                                                : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                                       }
                                    `}
                                    onClick={() => isAccessible && handleGoToStep(index)}
                                 >
                                    {isCompleted && !isCurrent ? (
                                       <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                       </svg>
                                    ) : (
                                       <span className="text-xs md:text-sm font-bold">{index + 1}</span>
                                    )}
                                 </div>
                                 
                                 {/* Step Label */}
                                 <div className="mt-2 text-center">
                                    <div className={`
                                       text-xs md:text-sm font-medium whitespace-nowrap
                                       ${isCurrent 
                                          ? "text-orange-600" 
                                          : isCompleted 
                                             ? "text-orange-600" 
                                             : isAccessible
                                                ? "text-gray-700"
                                                : "text-gray-400"
                                       }
                                    `}>
                                       {step.title}
                                    </div>
                                 </div>
                              </div>
                              
                              {/* Progress Line (only if not last step) */}
                              {!isLastStep && (
                                 <div className="flex-1 h-0.5 mx-2 md:mx-4 relative">
                                    <div className="absolute inset-0 bg-gray-200" />
                                    <div 
                                       className={`
                                          absolute inset-0 transition-all duration-500 ease-in-out
                                          ${isCompleted 
                                             ? "bg-orange-500 w-full" 
                                             : isCurrent && index < currentStep
                                                ? "bg-orange-500 w-full"
                                                : "bg-gray-200 w-0"
                                          }
                                       `}
                                    />
                                 </div>
                              )}
                           </div>
                        )
                     })}
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <Card className="border-0 shadow-lg p-6">
               <CardHeader className="pb-6">
                  <CardTitle className="flex items-center text-xl">
                     {React.createElement(currentStepData.icon, { className: "h-6 w-6 mr-3 text-orange-600" })}
                     <span className="text-gray-800">{currentStepData.title}</span>
                     <div className="ml-auto">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                           Step {currentStep + 1} of {TOTAL_STEPS}
                        </span>
                     </div>
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                     {getStepDescription(currentStepData.id)}
                  </CardDescription>
               </CardHeader>
               <CardContent className="pt-0">{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-8 gap-4">
               <Button 
                  variant="outline" 
                  onClick={handlePrevious} 
                  disabled={currentStep === 0} 
                  className="bg-white border-gray-300 hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto"
               >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
               </Button>

               <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Progress Indicator */}
                  <div className="text-sm text-gray-500 text-center sm:text-left">
                     {currentStep + 1} / {TOTAL_STEPS} steps completed
                  </div>
                  
                  {currentStep === TOTAL_STEPS - 1 ? (
                     <Button 
                        onClick={() => submitForm()} 
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 shadow-lg w-full sm:w-auto"
                     >
                        {isSubmitting ? (
                           <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Creating Shop...
                           </>
                        ) : (
                           "Create Shop"
                        )}
                     </Button>
                  ) : (
                     <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                        <Button 
                           onClick={handleNext}
                           disabled={!isCurrentStepValid}
                           className={`px-8 py-2 shadow-lg w-full sm:w-auto ${
                              !isCurrentStepValid 
                                 ? "opacity-50 cursor-not-allowed bg-gray-400" 
                                 : "bg-orange-600 hover:bg-orange-700"
                           }`}
                        >
                           Continue
                           <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                        {/* {!isCurrentStepValid && (
                           <p className="text-xs text-amber-600 mt-2 flex items-center justify-center sm:justify-end">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Complete required fields to continue
                           </p>
                        )} */}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
