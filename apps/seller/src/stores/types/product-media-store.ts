export interface ProductMediaStoreActions {
   setImages: (images: MediaItem[]) => void;
   setCoverImage: (image: File | null) => void;
}

export type MediaItem = {
   id: string;
   url?: string;
   file: File;
   //   name?: string;
}

export interface ProductMediaStoreState {
   images: MediaItem[];
   coverImage: File | null;
}
export type ProductMediaStore = ProductMediaStoreState & ProductMediaStoreActions