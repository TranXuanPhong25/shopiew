import axiosClient from "@/lib/clients/shopiewClient";
import {
    CreateProductData,
    CreateProductResponse,
    GetProductResponse,
    Product,
    UpdateProductData,
    UploadImageResponse
} from "./model";
import {ErrorResponse} from "@/lib/clients/types/ErrorResponse";
import axios from "axios";


export const ProductsService = {
   createDraftProduct: async (data: CreateProductData): Promise<CreateProductResponse> => {
      try {
         const response = await axiosClient.post<CreateProductResponse>("/products", {
            ...data,
            product:{
               ...data.product,
               coverImage: "https%3A%2F%2Fplacehold.co%2F505x505.png&w=1080&q=75",
            },
         });
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data;
         }
         throw err;
      }
   },
   getCategoryAndChildren: async (categoryId: string): Promise<any> => {
      try {
         const response = await axiosClient.get<any>(`/product-categories${categoryId && "/" + categoryId}`);
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   },
   getProductsByShopId: async (shopId: string, page: number, size: number): Promise<GetProductResponse> => {
      try {
         const response = await axiosClient.get<GetProductResponse>(`/products`,{
            params: {
               shop_id: shopId,
               page,
               size
            }
         });
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   },
   deleteProductByIds: async (productIds: string[]): Promise<void> => {
      try {
         await axiosClient.delete(`/products`, { data: { ids: productIds } });
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data;
         }
         throw err;
      }
   },
   updateProductById: async (productId: string, data: UpdateProductData): Promise<Product> => {
      try {
         const response = await axiosClient.put<Product>(`/products/${productId}`, data);
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   },
   getProductById: async (productId: string): Promise<Product> => {
      try {
         const response = await axiosClient.get<Product>(`/products/${productId}`);
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   }
}

export const UploadService = {
   generatePresignedUrl: async (file: File, fileName: string): Promise<UploadImageResponse> => {
      try {
         const response = await axiosClient.post<UploadImageResponse>("/upload/presigned-url/image", {
            fileName: fileName,
            mimeType: file.type,
            fileSize: file.size
         });
         return response.data;
      } catch (err) {
         if (axios.isAxiosError(err) && err.response) {
            throw err.response.data as ErrorResponse;
         }
         throw err;
      }
   },
   upload(file: File, presignedUrl: string): Promise<string> {
      return new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.open("PUT", presignedUrl, true);
         xhr.setRequestHeader("Content-Type", file.type);
         console.log(presignedUrl, file.type);
         xhr.onload = () => {
            if (xhr.status === 200) {
               resolve(presignedUrl.split("?")[0]); // Return the URL without query params
            } else {
               reject(new Error(`Failed to upload file: ${xhr.statusText}`));
            }
         };
         xhr.onerror = () => reject(new Error("Network error"));
         xhr.send(file);
      });
   },
   uploadFile: async(file: File, fileName: string): Promise<string> => {
      try {
         const { presignedUrl } = await UploadService.generatePresignedUrl(file, fileName);
         const uploadedUrl = await UploadService.upload(file, presignedUrl);
         return uploadedUrl;
      } catch (err) {
         throw err;
      }
   }
}