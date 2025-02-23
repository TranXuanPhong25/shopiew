import QuantityInput from "@/components/form/quanitty-input";
import {MapPin, Plus, ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import ShoppingCartPlus from "@/components/icon/shopping-cart-plus";

export default function ProductAction() {
    return (
        <div>
            <div className="flex mb-4">
                <MapPin className="size-6 text-gray-400"/>
                Delivery to <span className="font-medium">{"    Hanoi"}</span>
            </div>
            <h2 className="bg-green-200 px-3 w-fit border border-green-700 rounded-full">
                In stock: <span className="text-green-500 ">332</span>
            </h2>
            <QuantityInput initialValue={1} max={332}/>
            <h2>
                Total: <span className="text-2xl font-bold">$ 12.99</span>
            </h2>

            <Button className="w-full mt-2 bg-red-500/90 hover:bg-red-500 ">Purchase now</Button>
            <Button className="w-full  mt-2 border-custom-1 text-custom-1 hover:text-custom-1 hover:bg-custom-1/10" variant={"outline"}>
                <ShoppingCartPlus className={"fill-custom-1"}/>
                Add to cart
            </Button>

        </div>
    );
}