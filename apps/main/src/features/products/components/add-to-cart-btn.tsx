import ShoppingCartPlus from "@/components/icon/shopping-cart-plus";
import { Button } from "@/components/ui/button";
import { useVariantSelectionStore } from "@/stores/variant-selection-store";
import { useProductPageContext } from "../context";
import { useAddItemToCart } from "@/features/carts/hooks/use-add-item-to-cart";
const AddToCartBtn = ({quantity}:{quantity:number}) => {
   const {
      selectedVariant,
      currentVariants,
      isValid,
      currentInventory
   } = useVariantSelectionStore();
   const {
      product: {shopId}
   } = useProductPageContext();
   const hasVariants = Object.keys(selectedVariant).length > 0 || currentVariants !== null;
   const { mutate: addToCart } = useAddItemToCart();
   return (
      <Button
         className="w-full border-orange-500 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
         variant="outline"
         disabled={hasVariants && !isValid || currentInventory.available === 0}
         size="lg"
         onClick={() => addToCart({ productVariantID: "" + currentVariants[0].id, quantity, shopID: shopId })}
      >
         <ShoppingCartPlus className="w-4 h-4 mr-2 fill-current" />
         Add to cart
      </Button>
   )
}

export default AddToCartBtn;