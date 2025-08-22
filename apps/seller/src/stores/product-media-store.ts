import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {ProductMediaStore} from './types/product-media-store'

const useProductMediaStore = create<ProductMediaStore>()(
   devtools(
      (set, get) => ({
         images: [],
         coverImage: null,
         setImages: (images) => set({ images }),
         setCoverImage: (file) => {
            set({ coverImage: file })
         },
      }))
)
export default useProductMediaStore