import React, { forwardRef, useImperativeHandle } from 'react'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ImageUpload from '@/components/form/image-upload'
import { useFormStep } from '../../../hooks/useFormStep'
import { basicInfoSchema, BasicInfoFormData } from '../../../schemas/validation'

export interface StepRef {
   submit: () => void
   isValid: boolean
   saveData: () => void
}

export const BasicInfoStepRHF = forwardRef<StepRef, {}>((props, ref) => {
   const {
      form,
      handleNext,
      canProceedToNext,
      setBanner,
      setLogo,
      isValid,
      triggerSubmit,
      saveData
   } = useFormStep<BasicInfoFormData>({
      schema: basicInfoSchema,
      defaultValues: {
         shopName: '',
         location: '',
         businessType: 'individual' as const,
      }
   })

   useImperativeHandle(ref, () => ({
      submit: triggerSubmit,
      isValid,
      saveData
   }))

   const {
      control,
      register,
      formState: { errors }
   } = form

   return (
      <div className="space-y-6">
         {/* Shop Name */}
         <div className="space-y-2">
            <Label htmlFor="shopName" className="text-sm font-medium text-gray-700">
               Shop Name *
            </Label>
            <Input
               id="shopName"
               {...register('shopName')}
               placeholder="Enter your shop name"
               className={errors.shopName ? 'border-red-500' : ''}
            />
            {errors.shopName && (
               <p className="text-sm text-red-600">{errors.shopName.message}</p>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Location */}
            <div className="space-y-2">
               <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
               </Label>
               <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                     <Input
                        id="location"
                        {...field}
                        placeholder="Enter your shop location (city, country)"
                        className={errors.location ? 'border-red-500' : ''}
                     />
                  )}
               />
               {errors.location && (
                  <p className="text-sm text-red-600">{errors.location.message}</p>
               )}
            </div>
            {/* Business Type */}
            <div className="space-y-2">
               <Label htmlFor="businessType" className="text-sm font-medium text-gray-700">
                  Business Type *
               </Label>
               <Controller
                  name="businessType"
                  control={control}
                  render={({ field }) => (
                     <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                           <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="individual">Individual</SelectItem>
                           <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                     </Select>
                  )}
               />
               {errors.businessType && (
                  <p className="text-sm text-red-600">{errors.businessType.message}</p>
               )}
            </div>
         </div>

         {/* Shop Logo */}
         <div className='relative'>
            <div className="space-y-2 absolute bottom-[40px] left-[40px] z-20 ">

               <ImageUpload
                  placeholder="Upload shop logo"
                  maxSizeMB={2}
                  size="xl"
                  rounded
                  onImageChange={(file) => {
                     if (file) {
                        setLogo(file)
                     }
                  }}
               />


            </div>

            {/* Cover Image */}
            <div className="space-y-2">
               <Label htmlFor="banner" className="text-sm font-medium text-gray-700">
                  Shop Images
               </Label>
               <ImageUpload
                  placeholder="Upload shop banner"
                  maxSizeMB={5}
                  aspectRatio='8/3'
                  onImageChange={(file) => {
                     if (file) {
                        setBanner(file)
                     }
                  }}
               />
            </div>
         </div>

      </div>
   )
})
