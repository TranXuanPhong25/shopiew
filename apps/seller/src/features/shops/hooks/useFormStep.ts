import { useForm, DefaultValues, FieldValues, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodSchema } from 'zod'
import { useCallback, useEffect, useRef } from 'react'
import { useShopCreationStore } from '@/stores'
import { ShopData } from '../models'

interface UseFormStepProps<T extends FieldValues> {
  schema?: ZodSchema<T>
  defaultValues?: DefaultValues<T>
}

export function useFormStep<T extends FieldValues>({
  schema,
  defaultValues
}: UseFormStepProps<T>) {
  const {
    currentStep,
    shopData,
    setShopData,
    nextStep,
    prevStep,
    goToStep,
    setBanner,
    setLogo
  } = useShopCreationStore()

  const isInitialized = useRef(false)

  // Merge store data with default values
  const getFormData = useCallback((): DefaultValues<T> => {
    return { ...defaultValues, ...shopData } as unknown as DefaultValues<T>
  }, [defaultValues, shopData]);

  const form = useForm<T>({
    resolver: schema ? zodResolver(schema as any) : undefined,
    defaultValues: getFormData(),
    mode: 'onChange', // Validate on change for better UX
  })

  // Reset form with store data when component mounts or step changes
  useEffect(() => {
    if (!isInitialized.current) {
      // First time initialization
      const currentFormData = getFormData()
      form.reset(currentFormData)
      isInitialized.current = true
    }
  }, [form, getFormData])

  // Reset when step changes
  useEffect(() => {
    if (isInitialized.current) {
      const currentFormData = getFormData()
      form.reset(currentFormData)
    }
  }, [currentStep]) // eslint-disable-line react-hooks/exhaustive-deps

  const { handleSubmit, formState: { isValid, isDirty } } = form

  // Handle step completion
  const onSubmit: SubmitHandler<T> = (data: T) => {
    // Update store with form data
    setShopData(data as Partial<ShopData>)
    
    // Move to next step
    nextStep()
  }

  const handleNext = handleSubmit(onSubmit)

  // Handle going back
  const handleBack = () => {
    // Save current form data before going back
    const currentData = form.getValues()
    setShopData(currentData as Partial<ShopData>)
    prevStep()
  }

  // Handle step navigation
  const handleGoToStep = (targetStep: number) => {
    // Save current form data before navigating
    const currentData = form.getValues()
    setShopData(currentData as Partial<ShopData>)
    goToStep(targetStep)
  }

  return {
    form,
    handleNext,
    handleBack,
    handleGoToStep,
    canProceedToNext: isValid,
    isValid,
    isDirty,
    currentStep,
    shopData,
    setShopData,
    setBanner,
    setLogo,
    // Expose form methods for external control
    triggerSubmit: () => form.handleSubmit(onSubmit)(),
    saveData: () => {
      const currentData = form.getValues()
      setShopData(currentData as Partial<ShopData>)
    },
    getValues: form.getValues,
    formState: form.formState
  }
}
