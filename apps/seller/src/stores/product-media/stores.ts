import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {Types} from './types'

const useProductMediaStore = create<Types>()(
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