'use client';

import ImageList from './image-list';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {useProductMediaStore} from '@/stores';
import { MediaItem } from '@/stores/product-media/types';
const ImageListUpload = () => {
  const {images, setImages } = useProductMediaStore();

  const handleImagesChange = (newImages: MediaItem[]) => {
    setImages(newImages);
  };

  return (
    <div className="max-w-4xl  space-y-6">
      <div>
        <h2 className="text-xl mb-2">Hình ảnh sản phẩm</h2>
        <p className="text-gray-600">*Hình ảnh tỷ lệ 1:1</p>
      </div>
      <ImageList
        images={images}
        onImagesChange={handleImagesChange}
        maxImages={8}
        maxSizeMB={3}
        size="lg"
        allowReorder={true}
        placeholder="Add product image"
      />
      <div className="flex items-center gap-2 text-sm bg-slate-50/80 p-4">
        <Checkbox id="image-ratio-3-4" />
        <Label htmlFor="image-ratio-3-4" className="font-normal">
          Hình ảnh tỷ lệ 3:4{" "}
          <span className="text-muted-foreground">
            Giúp sản phẩm thời trang thêm nổi bật với tỷ lệ hình ảnh 3:4
          </span>
        </Label>
      </div>
    </div>
  );
};

export default ImageListUpload;