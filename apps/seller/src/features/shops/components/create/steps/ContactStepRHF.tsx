import React, { forwardRef, useImperativeHandle } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormStep } from '../../../hooks/useFormStep'
import { contactSchema, ContactFormData } from '../../../schemas/validation'

export interface StepRef {
  submit: () => void
  isValid: boolean
  saveData: () => void
}

export const ContactStepRHF = forwardRef<StepRef, {}>((props, ref) => {
  const {
    form,
    handleNext,
    isValid,
    triggerSubmit,
    saveData
  } = useFormStep<ContactFormData>({
    schema: contactSchema,
    defaultValues: {
      email: '',
      phone: '',

    }
  })

  useImperativeHandle(ref, () => ({
    submit: triggerSubmit,
    isValid,
    saveData
  }))

  const {
    register,
    formState: { errors }
  } = form

  return (
    <div className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="your.email@example.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number *
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+1 (555) 123-4567"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>
    </div>
  )
})
