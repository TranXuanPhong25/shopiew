export interface ProductCategory {
   id?: number;
   name: string;
   imageUrl: string;
   children?: ProductCategory[];
}