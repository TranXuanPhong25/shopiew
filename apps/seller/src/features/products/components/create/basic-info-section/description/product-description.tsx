import {Label} from "@/components/ui/label";
import ProductDescriptionEditor from "./tiptap-editor";
import {BasicInfoSectionProps} from "../basic-info-section";
import {Controller} from "react-hook-form";

export default function ProductDescription({
   register,
   control,
   errors,
   isDirty,
}: BasicInfoSectionProps) {
   return (
      <div className="">
         <Label htmlFor="product-description" className="text-base font-normal">
            *Mô tả sản phẩm
         </Label>
         <Controller
            control={control}
            name="description"
            render={({ field }) => (
               <ProductDescriptionEditor
                  isDirty={isDirty}
                  content={"<p></p>"}
                  onChange={field.onChange}
                  placeholder="Nhập mô tả sản phẩm hoặc tải lên hình ảnh"
                  id="product-description"
               />
            )}
         />
         {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
         )}
      </div>
   )
}