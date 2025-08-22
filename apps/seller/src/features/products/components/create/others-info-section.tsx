import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {NewProductFormData} from "@/lib/validations"
import {Control, Controller, FieldErrors, UseFormRegister} from "react-hook-form"

type OthersInfoSectionProps = {
   register: UseFormRegister<NewProductFormData>
   control: Control<NewProductFormData, any, NewProductFormData>
   errors: FieldErrors<NewProductFormData>
}

export default function OthersInfoSection({ register, control, errors, }: OthersInfoSectionProps) {
   return (
      <section
         id="others-info-section"
         className=" mt-8 space-y-8 p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto ">
         <h2 className="text-2xl font-bold mb-2">Thông tin khác</h2>
         <div>
            <div className="grid items-center grid-cols-[150px_1fr] gap-6">
               <Controller
                  name="isNew"
                  control={control}
                  render={({ field }) => (
                     <>
                        <Label htmlFor="others-isNew" className="text-base font-normal">
                           Condition
                        </Label>
                        <Select
                           onValueChange={field.onChange}
                           defaultValue={"New"}
                           value={field.value}>
                           <SelectTrigger className="max-w-md" id="others-isNew">
                              <SelectValue placeholder="Không" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="New">New</SelectItem>
                              <SelectItem value="Like new 99%">Like new 99%</SelectItem>
                              <SelectItem value="Like new 95%">Like new 95%</SelectItem>
                              <SelectItem value="Like new 90%">Like new 90%</SelectItem>
                              <SelectItem value="Used">Used</SelectItem>
                              <SelectItem value="Damaged">Damaged</SelectItem>
                              <SelectItem value="Refurbished">Refurbished</SelectItem>
                              <SelectItem value="For parts or not working">For parts or not working</SelectItem>
                           </SelectContent>
                        </Select>
                     </>
                  )}
               />

            </div>
            {errors.maxPurchaseQuantity && (
               <p className="text-red-500 text-sm mt-1">{errors.maxPurchaseQuantity.message}</p>
            )}
         </div>
      </section>
   )
}