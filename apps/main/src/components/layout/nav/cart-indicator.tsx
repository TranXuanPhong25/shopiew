"use client";
import { Button } from "@/components/ui/button";
import { useCartData } from "@/stores/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartIndicator = () => {
   const { totalQuantity } = useCartData();
   return (
      <div className="relative">
         <Link href="/carts">
            <Button variant="ghost" className="p-3">
               <ShoppingCart className="w-5 h-5" />
            </Button>
         </Link>
         <div
            className="absolute -top-1 -right-1 w-fit h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center px-2">
            {totalQuantity}
         </div>
      </div>
   )
}

export default CartIndicator;