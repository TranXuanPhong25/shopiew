import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import React from "react"
import { NewProductFormData } from "@/lib/validations"
import CategorySelection from "./categories/category-selection"
import ProductDescription from "./description/product-description"
import ImageListUpload from "./media/image-list-upload"
export type BasicInfoSectionProps = {
   register: UseFormRegister<NewProductFormData>,
   control: Control<NewProductFormData, any, NewProductFormData>,
   errors: FieldErrors<NewProductFormData>,
   isDirty?: boolean
}
const BasicInfoSection = ({ register, control, errors, isDirty }: BasicInfoSectionProps) => {
   return (
      <section className=" space-y-8 p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto" id={"basic-info-section"}>
         <h2 className="text-2xl font-bold mb-6 ">Thông tin cơ bản</h2>

         <ImageListUpload />
         
         {/* Product Video Section */}
         <div>
            <Label htmlFor="product-video" className="text-base font-normal pt-2">
               Video sản phẩm
            </Label>
            <div>
               <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
               >
                  <PlayCircle className="w-5 h-5 text-red-500" />
                  Thêm video
               </Button>
               <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Kích thước tối đa 30Mb, độ phân giải không vượt quá 1280x1280px</li>
                  <li>• Độ dài: 10s-60s</li>
                  <li>• Định dạng: MP4</li>
                  <li>
                     • Lưu ý: sản phẩm có thể hiển thị trong khi video đang được xử lý. Video sẽ tự động hiển thị sau khi
                     đã xử lý thành công
                  </li>
               </ul>
            </div>
         </div>

         {/* Product Name */}
         <div >
            <Label htmlFor="product-name" className="text-base font-normal">
               *Tên sản phẩm
            </Label>
            <div>
               <Input
                  id="product-name"
                  placeholder="Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật"
                  {...register("name")}
               />
               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
         </div>

         <CategorySelection control={control} errors={errors} isDirty={isDirty} />
         <ProductDescription
            register={register}
            control={control}
            errors={errors}
            isDirty={isDirty}
         />

      </section>
   )
}

export default BasicInfoSection