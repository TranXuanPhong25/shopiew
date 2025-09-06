/**
 * Constants and configuration for shop creation
 */
import { Store, Phone, CheckCircle } from "lucide-react"
import { ShopCreationStep } from './models'

export const SHOP_CREATION_STEPS: ShopCreationStep[] = [
   { id: "basic", title: "Basic Info", icon: Store },
   { id: "contact", title: "Contact", icon: Phone },
   { id: "finish", title: "Finish", icon: CheckCircle },
]

export const TOTAL_STEPS = SHOP_CREATION_STEPS.length

export const getStepDescription = (stepId: string): string => {
   const descriptions: Record<string, string> = {
      basic: "Tell us about your shop and what you sell",
      contact: "Add your contact information",
      finish: "Review and complete your shop setup"
   }
   return descriptions[stepId] || ""
}
