"use client"

import {Control, Controller, FieldErrors} from "react-hook-form"
import Link from "next/link"

import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {NewProductFormData} from "@/lib/validations"
import {Label} from "@/components/ui/label"

type ProductDetailsFormProps = {
   control: Control<NewProductFormData, any, NewProductFormData>,
   errors: FieldErrors<NewProductFormData>,
   isDirty?: boolean
}
export default function ProductDetailsSection({ control, errors, isDirty }: ProductDetailsFormProps) {

   return (
      <section
         id="products-detail-section"
         className=" mt-8 space-y-8 p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
         <h2 className="text-2xl font-bold mb-2">Thông tin chi tiết</h2>
         <p className="text-sm text-muted-foreground mb-6">
            Hoàn thành: 4 / 20 Điền thông tin thuốc tính để tăng mức độ hiển thị cho sản phẩm{" "}
            <Link href="#" className="text-blue-600 hover:underline">
               Xem hướng dẫn bổ sung thuộc tính.
            </Link>
         </p>

         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
               {/* Brand */}
               <Controller
                  control={control}
                  name="specs.brand"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="brand">
                           <span className="text-red-500">*</span> Thương hiệu
                        </Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <SelectTrigger id="brand">
                              <SelectValue placeholder="Chọn thương hiệu" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Weilaiya">Weilaiya</SelectItem>
                              <SelectItem value="Brand A">Brand A</SelectItem>
                              <SelectItem value="Brand B">Brand B</SelectItem>
                           </SelectContent>
                        </Select>
                        {errors.specs?.brand && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.specs?.brand?.message || "Thương hiệu là bắt buộc."
                              }
                           </p>
                        )}
                     </div>
                  )}
               />
               {/* Package Size */}
               <Controller
                  control={control}
                  name="specs.packageSize"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="packageSize">Kích Cỡ Gói</Label>
                        <div className="flex items-center gap-2">
                           <Input type="number" placeholder="Vui lòng điền vào" id="packageSize" {...field} />
                           <span className="text-muted-foreground">ML</span>
                        </div>
                        {errors.specs?.packageSize && (
                           <p className="text-red-500 text-xs mt-1">
                              {errors.specs?.packageSize?.message  || "Kích cỡ gói phải là số."}
                           </p>
                        )}
                     </div>
                  )} />

               {/* Active Ingredients */}
               <Controller
                  control={control}
                  name="specs.activeIngredients"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="activeIngredients">
                           Thành Phần Hoạt Tính <span className="text-xs text-muted-foreground">1/5</span>
                        </Label>
                        {/* This would ideally be a multi-select/tag input component */}
                        <Input type="text" placeholder="Anti-oxidants" id="activeIngredients" {...field} />
                     </div>
                  )}
               />

               {/* Ingredients */}
               <Controller
                  control={control}
                  name="specs.ingredients"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="ingredients">Thành phần</Label>
                        <Input type="text" placeholder="Vui lòng điền vào" id="ingredients" {...field} />
                     </div>
                  )}
               />

               {/* Quantity */}
               <Controller
                  control={control}
                  name="specs.quantity"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="quantity">Số lượng</Label>
                        <Input type="number" placeholder="100" id="quantity" {...field} />
                     </div>
                  )}
               />

               {/* Responsible Manufacturing Address */}
               <Controller
                  control={control}
                  name="specs.responsibleManufacturingAddress"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="responsibleManufacturingAddress">
                           Địa chỉ tổ chức chịu trách nhiệm sản xuất <span className="text-xs text-muted-foreground">0/5</span>
                        </Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <SelectTrigger id="responsibleManufacturingAddress">
                              <SelectValue placeholder="Vui lòng chọn" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Address 1">Address 1</SelectItem>
                              <SelectItem value="Address 2">Address 2</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  )}
               />

               {/* Weight */}
               <Controller
                  control={control}
                  name="specs.weightValue"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="specs-weightValue">Trọng lượng</Label>
                        <div className="flex items-center gap-2">
                           <Input type="text" placeholder="50" {...field} id="specs-weightValue"/>
                           <Controller
                              control={control}
                              name="specs.weightUnit"
                              render={({ field: unitField }) => (
                                 <Select onValueChange={unitField.onChange} defaultValue={unitField.value}>
                                    <SelectTrigger className="w-[80px]">
                                       <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="g">g</SelectItem>
                                       <SelectItem value="kg">kg</SelectItem>
                                       <SelectItem value="ml">ml</SelectItem>
                                       <SelectItem value="l">l</SelectItem>
                                    </SelectContent>
                                 </Select>
                              )}
                           />
                        </div>
                     </div>
                  )}
               />

               {/* Packaging Type */}
               <Controller
                  control={control}
                  name="specs.packagingType"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="specs-packagingType">Kiểu đóng gói</Label>
                        <Select
                           onValueChange={field.onChange}
                           defaultValue={"Type A"}
                           value={field.value}
                        >
                           <SelectTrigger  id="specs-packagingType">
                              <SelectValue placeholder="Vui lòng chọn" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Type A">Type A</SelectItem>
                              <SelectItem value="Type B">Type B</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  )}
               />

               {/* Product Size */}
               <Controller
                  control={control}
                  name="specs.productSize"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="specs-productSize">Kích cỡ sản phẩm</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <SelectTrigger id="specs-productSize">
                              <SelectValue placeholder="Vui lòng chọn" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Small">Small</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Large">Large</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  )}
               />

               {/* Packaging Material */}
               <Controller
                  control={control}
                  name="specs.packagingMaterial"
                  render={({ field }) => (
                     <div>
                        <Label htmlFor="specs-packagingMaterial">Loại bao bì</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <SelectTrigger id="specs-packagingMaterial">
                              <SelectValue placeholder="Vui lòng chọn" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="Plastic">Plastic</SelectItem>
                              <SelectItem value="Glass">Glass</SelectItem>
                              <SelectItem value="Cardboard">Cardboard</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  )}
               />
            </div>

         </div>
      </section>
   )
}
