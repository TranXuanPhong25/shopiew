import { ProductDetail, ProductVariant, VariantOption, SelectedVariant } from "@/features/products/types"
import ProductImages from "../product-image"
import RatingStars from "@/components/ui/rating-stars"
import VariantsSelection from "../variants/variants-selection"
import { useProductPageContext } from "../../context"

const SaleInformations = () => {
   const { 
      product,
      options,
      selectedVariant,
      selectVariant: onVariantChange,
      clearSelection: onClearSelection,
      currentPrice,
      maxPrice
    } = useProductPageContext();
   return (
      <div className=" bg-white rounded-2xl shadow-sm p-4">
         <div className="sm:flex ">
            <ProductImages />
            <div className={"flex-1 sm:ml-4"}>
               <h1 className="text-lg">
                  {product.name}
               </h1>

               <div
                  className="flex items-center mb-2 hover:bg-gray-50/10 w-fit p-2 -mx-2 rounded-md ">
                  <span
                     className="ml-3 text-lg">{3.15}
                  </span>
                  <a href="#">
                     <RatingStars rating={3} />
                  </a>
                  <span
                     className="text-sm text-gray-600 dark:text-gray-300">({31513})
                  </span>
                  <span className="ml-2 opacity-50">|</span>
                  <span
                     className="ml-2 font-sans  text-sm">352 sold</span>
               </div>


               <div className="flex items-center space-x-2 bg-orange-50 p-2 rounded-md mb-4">
                  <span className="text-3xl font-bold text-red-400">{selectedVariant ? currentPrice.originalPrice : `${currentPrice.originalPrice} - ${maxPrice}`}đ</span>
                  <span className="text-gray-500 line-through">{currentPrice.salePrice}đ</span>
                  <span className="text-red-500">-25%</span>
               </div>
               <div className="flex items-center mb-4">
                  <h2>
                     Shop coupons
                  </h2>
                  <div className="ml-2 flex gap-2 text-red-500 font-bold text-sm">
                     <span className="bg-red-200/80 px-2 py-1 rounded-sm ">
                        5% OFF
                     </span>
                     <span className="bg-red-200/80 px-2 py-1 rounded-sm ">
                        5k OFF
                     </span>
                     <span className="bg-red-200/80 px-2 py-1 rounded-sm ">
                        7% OFF
                     </span>
                  </div>
               </div>

               {/* Product Variants Selection */}
               <VariantsSelection
                  options={options}
                  selectedVariant={selectedVariant}
                  onVariantChange={onVariantChange}
                  onClearSelection={onClearSelection}
               />
            </div>
         </div>
      </div>
   )
}
export default SaleInformations