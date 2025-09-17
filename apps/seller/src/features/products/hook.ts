import {useMutation} from "@tanstack/react-query";
import {CreateProductData, ProductVariant, UploadImageResponse} from "./model";
import {ProductsService, UploadService} from "./service";
import {useVariantStore, useProductMediaStore} from "@/stores";
import { MediaItem } from "@/stores/product-media/types";

const useCreateProduct = () => {
   const { getSelectedVariantsHasImage } = useVariantStore();
   const { images, coverImage } = useProductMediaStore();

   const { uploadImages } = useUploadImages();
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["createProduct"],
      mutationFn: async (data: CreateProductData) => {
         try {
            const product = await ProductsService.createDraftProduct(data);

            if (!coverImage) {
               throw new Error("Cover image is required");
            }

            const coverImageUpload = await uploadImages({
               id: `_cover_${product.id}`,
               file: coverImage,
            });
            product.coverImage = coverImageUpload.resource;

            const uploadedProductImages = await Promise.all(images.map(image => uploadImages(image)));
            product.images = uploadedProductImages.map(uploaded => uploaded.resource);

            let updatedVariants: ProductVariant[] = [];
            if (product.variants) {
               const selectedVariantHasImage = getSelectedVariantsHasImage();
               const variantImages = selectedVariantHasImage.flatMap(variant => variant.images || []);
               const uploadedVariantImages
                  = await Promise.all(variantImages.map(
                     image => uploadImages({
                        id: image.id,
                        file: image.file
                     })));
               updatedVariants = product.variants.map(variant => {
                  const matchedVariant = selectedVariantHasImage
                     .find(variantInStore =>
                        variantInStore.name == Object.values(variant.attributes || {}).join('/')
                     );
                  return {
                     ...variant,
                     images: uploadedVariantImages
                        .map(uploaded => uploaded.resource)
                        .filter(url => matchedVariant?.images
                           ?.some(image => url.includes(image.id + "_" + image.file.name)))
                  };
               });
            }

            const updatedProduct = await ProductsService.updateProductById(product?.id, {
               product: {
                  ...product,
               },
               variants: updatedVariants
            });
            return updatedProduct;
         } catch (error) {
            throw error;
         }
      },
   });

   return { createProduct: mutateAsync, isCreating: isPending, isError, error };
}
const useUploadImages = () => {
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["uploadImages"],
      mutationFn: async (data: MediaItem): Promise<UploadImageResponse> => {
         try {
            const fileName = data.id + "_" + data.file.name;
            const {
               presignedUrl,
               resource
            } = await UploadService.generatePresignedUrl(data.file, fileName);
            await UploadService.upload(data.file, presignedUrl);
            return {
               presignedUrl,
               fileName,
               resource
            };
         } catch (error) {
            throw error;
         }
      },
   });

   return { uploadImages: mutateAsync, isUploading: isPending, isError, error };
};

export {
   useCreateProduct,
};