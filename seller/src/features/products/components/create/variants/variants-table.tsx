"use client"

import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { TriadCheckbox } from "@/components/ui/triad-checkbox"
import { useVariantStore } from "@/stores/variant-store"
import { InputWithUnit } from "@/components/form/input-with-unit"
import ImageUpload from "@/components/form/image-upload"

export default function VariantsTable() {
   const {
      variants,
      updateVariant,
      toggleVariant,
      variantsSelectState,
      onChangeVariantsSelect,
      onImageChange,
   } = useVariantStore()
   if (variants.length === 0) {
      return null
   }
   return (
      <div className="bg-white rounded-lg shadow-sm border">
         <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" type="button">
                  <Search className="w-4 h-4" />
               </Button>
               <Button variant="ghost" size="sm" type="button">
                  <Filter className="w-4 h-4" />
               </Button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-gray-50">
                  <tr>
                     <th className="text-left p-4 font-medium text-gray-700">
                        <TriadCheckbox state={variantsSelectState()} onStateChange={onChangeVariantsSelect} />
                        <span className="ml-3">Variant</span>
                     </th>
                     <th className="text-left p-4 font-medium text-gray-700">Price</th>
                     <th className="text-left p-4 font-medium text-gray-700">Available</th>
                     <th className="text-left p-4 font-medium text-gray-700">SKU (Optional)</th>
                  </tr>
               </thead>
               <tbody>
                  {variants.map((variant) => (
                     <tr key={variant.id} className="border-t">
                        <td className="p-4">
                           <div className="flex items-center gap-3">
                              <Checkbox checked={variant.selected} onCheckedChange={() => toggleVariant(variant.id)} />
                              <ImageUpload onImageChange={(file)=>onImageChange(variant.id, file)} />
                              <span>{variant.name}</span>
                           </div>
                        </td>
                        <td className="p-4">
                           <div className="w-32">
                              <InputWithUnit
                              id={`price-${variant.id}`}
                              unit="đ"
                              type="text"
                              inputClassName="!w-full"
                              value={variant.price}
                              onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                              placeholder="0"
                              />
                           </div>
                        </td>
                        <td className="p-4">
                           <Input
                              id={`available-${variant.id}`}
                              type="number"
                              value={variant.available}
                              onChange={(e) => updateVariant(variant.id, "available", e.target.value)}
                              className="w-20"
                              placeholder="0"
                           />
                        </td>
                        <td className="p-4">
                           <Input
                              id={`sku-${variant.id}`}
                              value={variant.sku}
                              onChange={(e) => updateVariant(variant.id, "sku", e.target.value)}
                              className="w-32"
                              placeholder="sku"
                           />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-4 border-t bg-gray-50 text-center text-sm text-gray-600">
            Total inventory at Shop location: {variants.reduce((total, variant) => total + parseInt(variant.available || '0'), 0)} available
         </div>
      </div>
   )
}
