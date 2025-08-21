"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import CategorySelection from "@/features/products/components/create/basic-info-section/categories/category-selection"
import { useAuth } from "@/features/auth/hook"
import { useGenerateMockProducts } from "@/features/dev/hooks/use-generate-mock-products"
import { Progress } from "@/components/ui/progress"

export default function MockProductGenerator() {
   const { shop } = useAuth();
   const { 
      generateMockProducts, 
      isGenerating, 
      results, 
      errors, 
      progress,
      reset: resetResults 
   } = useGenerateMockProducts();
   
   const form = useForm({
      defaultValues: {
         count: 5,
         category: "",
         includeImages: false,
         shopId: "",
      },
   })

   async function onSubmit(values: any) {
      try {
         if (!shop?.id) {
            toast.error("Shop ID is required");
            return;
         }
         
         // Get category ID from the selected value
         const categoryId = values.category ? parseInt(values.category.split('-')[0]) : 1;
         
         const result = await generateMockProducts({
            count: values.count,
            categoryId: categoryId,
            includeImages: values.includeImages,
            shopId: shop.id,
         });

         if (result.success) {
            toast.success(`Successfully created ${result.count} mock products`);
         } else if (result.count > 0) {
            toast.warning(`Created ${result.count} products with ${result.errors?.length} errors`);
         } else {
            toast.error("Failed to create any products");
         }
      } catch (error) {
         console.error("Error generating mock products:", error);
         toast.error("Failed to generate mock products");
      }
   }

   return (
      <div className="container mx-auto py-10">
         <h1 className="text-3xl font-bold mb-6">Mock Product Generator</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
               <CardHeader>
                  <CardTitle>Generate Mock Products</CardTitle>
                  <CardDescription>
                     Create realistic mock products with the specified shop ID for testing purposes.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                           control={form.control}
                           name="count"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Number of Products</FormLabel>
                                 <FormControl>
                                    <Input type="number" placeholder="5" min={1} {...field} disabled={isGenerating} />
                                 </FormControl>
                                 <FormDescription>
                                    How many mock products do you want to generate?
                                 </FormDescription>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <CategorySelection
                           control={form.control}
                           errors={form.formState.errors}
                           isDirty={form.formState.isDirty}
                        />

                        <FormField
                           control={form.control}
                           name="includeImages"
                           render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                 <FormControl>
                                    <Checkbox
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                       disabled={isGenerating}
                                    />
                                 </FormControl>
                                 <div className="space-y-1 leading-none">
                                    <FormLabel>Include Random Images</FormLabel>
                                    <FormDescription>
                                       Generate random images for the products
                                    </FormDescription>
                                 </div>
                              </FormItem>
                           )}
                        />

                        {shop?.id && (
                           <FormItem>
                              <FormLabel>Shop ID</FormLabel>
                              <FormControl>
                                 <Input value={shop.id} disabled className="bg-gray-50" />
                              </FormControl>
                              <FormDescription>
                                 The shop ID the products will be associated with
                              </FormDescription>
                           </FormItem>
                        )}

                        <Button
                           type="submit"
                           disabled={isGenerating || !shop?.id}
                           className="w-full"
                        >
                           {isGenerating ? (
                              <>
                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                 Generating...
                              </>
                           ) : (
                              "Generate Mock Products"
                           )}
                        </Button>
                        
                        {isGenerating && (
                           <div className="mt-4 space-y-2">
                              <Progress value={progress} className="h-2" />
                              <p className="text-sm text-center">
                                 Created {results.length} of {form.getValues().count} products
                              </p>
                           </div>
                        )}
                     </form>
                  </Form>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Results</CardTitle>
                  <CardDescription>
                     {results.length > 0 
                        ? `${results.length} products created${errors.length > 0 ? ` with ${errors.length} errors` : ''}`
                        : "Generated products will appear here"}
                  </CardDescription>
               </CardHeader>
               <CardContent className="max-h-96 overflow-auto">
                  {results.length > 0 ? (
                     <div>
                        <div className="mb-4">
                           <div className="flex justify-between items-center mb-2">
                              <div className="font-semibold">Summary</div>
                           </div>
                           <div className="bg-gray-50 p-4 rounded-md text-sm">
                              <p>✅ Successfully created: {results.length} products</p>
                              {errors.length > 0 && (
                                 <p>❌ Failed: {errors.length} products</p>
                              )}
                           </div>
                        </div>

                        <div className="font-semibold mb-2">Created Products</div>
                        <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto">
                           {JSON.stringify(results, null, 2)}
                        </pre>

                        {errors.length > 0 && (
                           <div className="mt-4">
                              <div className="font-semibold mb-2 text-red-500">Errors</div>
                              <pre className="bg-red-50 p-4 rounded-md text-sm overflow-x-auto">
                                 {JSON.stringify(errors, null, 2)}
                              </pre>
                           </div>
                        )}
                     </div>
                  ) : (
                     <div className="text-center p-8 text-gray-500">
                        No products generated yet
                     </div>
                  )}
               </CardContent>
               {(results.length > 0 || errors.length > 0) && (
                  <CardFooter className="flex justify-between">
                     <Button
                        variant="outline"
                        onClick={resetResults}
                        disabled={isGenerating}
                     >
                        Clear Results
                     </Button>
                     <Button
                        variant="secondary"
                        onClick={() => {
                           const data = { results, errors };
                           navigator.clipboard.writeText(JSON.stringify(data, null, 2));
                           toast.success("Results copied to clipboard");
                        }}
                        disabled={isGenerating}
                     >
                        Copy to Clipboard
                     </Button>
                  </CardFooter>
               )}
            </Card>
         </div>
      </div>
   )
}
