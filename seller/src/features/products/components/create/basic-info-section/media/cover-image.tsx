import ImageUpload from "@/components/form/image-upload";
import useProductMediaStore from "@/stores/product-media-store";

const CoverImage = () => {
   const {
      coverImage,
      setCoverImage
   } = useProductMediaStore()
   const handleImageChange = (file: File | null) => {
      setCoverImage(file);
   }
   return (
      <div className="flex flex-col gap-4">
         <ImageUpload
            variant="default"
            size="lg"
            maxSizeMB={2}
            label="*Cover Image"
            onImageChange={handleImageChange}
         />
      </div>
   )
}


export default CoverImage;