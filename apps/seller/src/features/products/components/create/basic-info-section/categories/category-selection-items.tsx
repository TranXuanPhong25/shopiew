import {SelectItem} from "@/components/ui/select";
import {Separator} from "@/components/ui/separator";


const CategorySelectionItems = ({ isLoading, categoryAndChildren }: { isLoading: boolean, categoryAndChildren: any }) => {
   const categoryFormValue = (category: {
      id: string,
      name: string
   }) => {
      return `${category.id}-${category.name}`;
   }
   if (isLoading) {
      return <SelectItem value="---" disabled>Loading categories...</SelectItem>;
   }
   const isRootCategories = Array.isArray(categoryAndChildren);
   if (isRootCategories) {
      return categoryAndChildren?.map((category: any) => (
         <SelectItem
            key={category.id}
            value={categoryFormValue(category)}
         >
            {category.name}
         </SelectItem>
      ))
   }
   const hasParent = categoryAndChildren.parent && categoryAndChildren.parent !== null;
   return (
      <>
         {
            hasParent ? (
               <SelectItem value={"-" + categoryFormValue(categoryAndChildren.parent)} >
                  --- {categoryAndChildren.parent.name} ---
               </SelectItem>
            ) : (
               <SelectItem value="-">
                  ---
               </SelectItem>
            )
         }
         <Separator className="my-2" />
         {
            !categoryAndChildren?.children || categoryAndChildren?.children.length==0 &&
            <SelectItem value={categoryFormValue(categoryAndChildren)}>
               {categoryAndChildren.name}
            </SelectItem>
         }
         {

            categoryAndChildren?.children?.map((category: any) => (
               <SelectItem
                  key={category.id}
                  value={categoryFormValue(category)}
               >
                  {category.name}
               </SelectItem>
            ))
         }
      </>
   )


}

export default CategorySelectionItems;