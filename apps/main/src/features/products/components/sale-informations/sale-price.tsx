import { useVariantSelectionStore } from "../../../../stores/variant-selection-store";

const SalePrice = () => {
   const {
      currentPrice,
    } = useVariantSelectionStore();
   const displayPrice = currentPrice.maxPrice == currentPrice.originalPrice ? currentPrice.originalPrice : `${currentPrice.originalPrice} - ${currentPrice.maxPrice}`
   if (!currentPrice) {
      return null;   
   }
   return (

      <div className="flex items-center space-x-2 bg-orange-50 p-2 rounded-md mb-4">
         <span className="text-3xl font-bold text-red-400">{displayPrice}đ</span>
         <span className="text-gray-500 line-through">{currentPrice.salePrice}đ</span>
         <span className="text-red-500">-25%</span>
      </div>
   )
}

export default SalePrice;