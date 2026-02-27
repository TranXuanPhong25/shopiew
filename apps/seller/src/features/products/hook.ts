import {useMutation, useQuery} from "@tanstack/react-query";
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

const useGetProductById = (productId: string) => {
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ["product", productId],
      queryFn: () => ProductsService.getProductById(productId),
      enabled: !!productId,
   });

   return { product: data, isLoading, isError, error };
};

const useUpdateProduct = () => {
   const { getSelectedVariantsHasImage } = useVariantStore();
   const { images, coverImage } = useProductMediaStore();

   const { uploadImages } = useUploadImages();
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["updateProduct"],
      mutationFn: async ({ productId, data }: { productId: string; data: CreateProductData }) => {
         try {
            let updatedData = { ...data };
            
            // Upload new cover image if it's a File
            if (coverImage && coverImage instanceof File) {
               const coverImageUpload = await uploadImages({
                  id: `_cover_${productId}`,
                  file: coverImage,
               });
               updatedData.product.coverImage = coverImageUpload.resource;
            }

            // Upload new product images (only Files, skip existing URLs)
            const newImages = images.filter(img => img.file instanceof File);
            const existingImageUrls = images
               .filter(img => typeof img.file === 'string')
               .map(img => img.file as string);
            
            if (newImages.length > 0) {
               const uploadedProductImages = await Promise.all(
                  newImages.map(image => uploadImages(image))
               );
               updatedData.product.images = [
                  ...existingImageUrls,
                  ...uploadedProductImages.map(uploaded => uploaded.resource)
               ];
            }

            // Handle variant images
            let updatedVariants: ProductVariant[] = [];
            if (updatedData.variants) {
               const selectedVariantHasImage = getSelectedVariantsHasImage();
               const variantNewImages = selectedVariantHasImage
                  .flatMap(variant => variant.images?.filter(img => img.file instanceof File) || []);
               
               if (variantNewImages.length > 0) {
                  const uploadedVariantImages = await Promise.all(
                     variantNewImages.map(image => uploadImages({
                        id: image.id,
                        file: image.file as File
                     }))
                  );

                  updatedVariants = updatedData.variants.map(variant => {
                     const matchedVariant = selectedVariantHasImage
                        .find(variantInStore =>
                           variantInStore.name == Object.values(variant.attributes || {}).join('/')
                        );
                     
                     const existingUrls = matchedVariant?.images
                        ?.filter(img => typeof img.file === 'string')
                        .map(img => img.file as string) || [];
                     
                     const newUrls = uploadedVariantImages
                        .map(uploaded => uploaded.resource)
                        .filter(url => matchedVariant?.images
                           ?.some(image => image.file instanceof File && url.includes(image.id + "_" + image.file.name)));

                     return {
                        ...variant,
                        images: [...existingUrls, ...newUrls]
                     };
                  });
               } else {
                  updatedVariants = updatedData.variants;
               }
            }

            const updatedProduct = await ProductsService.updateProductById(productId, {
               product: updatedData.product,
               variants: updatedVariants.length > 0 ? updatedVariants : updatedData.variants
            });
            
            return updatedProduct;
         } catch (error) {
            throw error;
         }
      },
   });

   return { updateProduct: mutateAsync, isUpdating: isPending, isError, error };
};

export {
   useCreateProduct,
   useGetProductById,
   useUpdateProduct,
};