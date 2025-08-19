import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth";
import { MoreVerticalIcon, Pencil, Copy, Star, Trash } from "lucide-react";
import { useDeleteProducts } from "./hook";

const ProductActions = ({
   productId,
   onDelete = () => {},
}: {
   productId: string[];
   onDelete?: () => void;
}) => {
   const { loading: isGettingShopInfo } = useAuth();
   const { deleteProducts, isDeleting, isError, error } = useDeleteProducts();
   if (isGettingShopInfo || isDeleting) {
      return (
         null
      );
   }
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex mx-auto size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
               <MoreVerticalIcon />
               <span className="sr-only">Open menu</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem>
               <Pencil className=" size-4" />
               <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Copy className=" size-4" />
               <span>Make a copy</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
               <Star className=" size-4" />
               <span>Favorite</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:!bg-red-500 hover:!text-white" onClick={() => {
               deleteProducts(productId);
               onDelete();
            }}>
               <Trash className=" size-4" />
               <span>Delete</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
export default ProductActions;