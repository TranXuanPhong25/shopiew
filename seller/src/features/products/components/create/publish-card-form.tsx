import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarClock } from 'lucide-react'
import { NewProductFormData } from "@/lib/validations"
import { UseFormRegister, Control, FieldErrors, Controller } from "react-hook-form"
type PublishCardFormProps = {
   register: UseFormRegister<NewProductFormData>
   control: Control<NewProductFormData, any, NewProductFormData>
   errors: FieldErrors<NewProductFormData>
}
export default function PublishCardForm({
   register,
   control,
   errors
}: PublishCardFormProps
) {
   return (
      <>
         <div className=" z-10 h-fit shadow-sm rounded-lg w-[342px] border-b-4 border[1px] border-gray-200 flex flex-col gap-4 p-4 md:p-6 bg-white items-center justify-center">
            <Card className="w-full max-w-sm">
               <CardHeader>
                  <CardTitle className="text-base font-semibold">Status</CardTitle>
               </CardHeader>
               <CardContent>
                  <Controller
                     name="status"
                     control={control}
                     render={({ field }) => (
                        <Select defaultValue="ACTIVE"
                           onValueChange={field.onChange}
                           value={field.value}>
                           <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="ACTIVE">Active</SelectItem>
                              <SelectItem value="DRAFT">Draft</SelectItem>
                              <SelectItem value="ARCHIVED">Archived</SelectItem>
                           </SelectContent>
                        </Select>)}
                  />
               </CardContent>
            </Card>

            <Card className="w-full max-w-sm">
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold">Publishing</CardTitle>
                  <Link href="#" className="text-sm font-medium text-blue-600 hover:underline">
                     Manage
                  </Link>
               </CardHeader>
               <CardContent className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" className="flex items-center gap-2 px-3 py-1.5 text-sm h-auto">
                     Online Store
                     <CalendarClock className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="outline" className="px-3 py-1.5 text-sm h-auto">
                     Point of Saler
                  </Button>
               </CardContent>
            </Card>
            <Button type="submit" className="px-6 py-2 text-white rounded-md float-right  w-full">
               Save Product
            </Button>
         </div>
      </>
   )
}
