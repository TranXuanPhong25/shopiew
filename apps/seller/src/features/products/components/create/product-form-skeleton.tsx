import {Skeleton} from "@/components/ui/skeleton";

export default function ProductFormSkeleton() {
   return (
      <div className="space-y-8">
         {/* Skeleton for BasicInfoSection */}
         <div className="p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
            <Skeleton className="h-8 w-1/3 mb-6" />
            <div className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-10 w-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-10 w-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-40 w-full" />
               </div>
            </div>
         </div>

         {/* Skeleton for ProductDetailsForm */}
         <div className="p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="space-y-6">
               {[1, 2, 3].map((i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                     <Skeleton className="h-6 w-28" />
                     <Skeleton className="h-10 w-full" />
                  </div>
               ))}
            </div>
         </div>

         {/* Skeleton for SalesInfoSection */}
         <div className="p-6 bg-white rounded-lg shadow-sm max-w-5xl mx-auto">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="space-y-6">
               {[1, 2].map((i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
                     <Skeleton className="h-6 w-28" />
                     <Skeleton className="h-10 w-full" />
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}