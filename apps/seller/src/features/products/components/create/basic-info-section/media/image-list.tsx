'use client';

import {useCallback, useState} from 'react';
import {cn} from '@/lib/utils';
import ImageUpload, {ImageUploadSizeClasses} from '@/components/form/image-upload';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {MoveLeft, MoveRight, X} from 'lucide-react';
import {Card} from '@/components/ui/card';
import {MediaItem} from '@/stores/types/product-media-store';
import CoverImage from './cover-image';

interface ImageListProps {
  images?: MediaItem[];
  onImagesChange?: (images: MediaItem[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  allowReorder?: boolean;
  placeholder?: string;
}

const ImageList = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  maxSizeMB = 5,
  className,
  disabled = false,
  size = 'md',
  allowReorder = true,
  placeholder = "Add image"
}: ImageListProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleImageUpload = useCallback((file: File | null, url: string | null) => {
    if (file && url) {
      const newImage: MediaItem = {
        id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        url,
        file,
      };

      const updatedImages = [...images, newImage];
      onImagesChange?.(updatedImages);
    }
  }, [images, onImagesChange]);

  const handleImageRemove = useCallback((imageId: string) => {
    const imageToRemove = images.find(img => img.id === imageId);
    if (imageToRemove?.url && imageToRemove.file) {
      // Only revoke if it's a blob URL
      if (imageToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url);
      }
    }

    const updatedImages = images.filter(img => img.id !== imageId);
    onImagesChange?.(updatedImages);
  }, [images, onImagesChange]);

  const handleImageReorder = useCallback((fromIndex: number, toIndex: number) => {
    if (!allowReorder || fromIndex === toIndex) return;

    const updatedImages = [...images];
    const [removed] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, removed);

    onImagesChange?.(updatedImages);
  }, [images, onImagesChange, allowReorder]);

  const handleMoveImage = useCallback((index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < images.length) {
      handleImageReorder(index, newIndex);
    }
  }, [images.length, handleImageReorder]);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    if (!allowReorder) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, [allowReorder]);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    if (!allowReorder || draggedIndex === null) return;
    e.preventDefault();
    setDragOverIndex(index);
  }, [allowReorder, draggedIndex]);

  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, index: number) => {
    if (!allowReorder || draggedIndex === null) return;
    e.preventDefault();

    handleImageReorder(draggedIndex, index);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [allowReorder, draggedIndex, handleImageReorder]);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  const sizeClasses = ImageUploadSizeClasses

  const canAddMore = images.length < maxImages;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Images Grid */}
      <div className="flex flex-wrap gap-4">
        <CoverImage />
        {images.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              "relative group rounded-md",
              allowReorder && "cursor-move",
              draggedIndex === index && "opacity-50",
              dragOverIndex === index && "ring-2 ring-primary ring-offset-2"
            )}
            draggable={allowReorder && !disabled}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <Card className={cn(
              "relative overflow-hidden transition-all duration-200",
              "border border-gray-200 hover:border-gray-300",
              sizeClasses[size]
            )}>
              <Image
                src={image.url||""}
                alt={image.file.name || `Image ${index + 1}`}
                fill
                className="object-cover"
                sizes={`${Number(sizeClasses[size].slice(-2)) * 4}px`}
              />

              {/* Remove button */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleImageRemove(image.id)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>

              {/* Reorder buttons */}
              {allowReorder && images.length > 1 && (
                <div className="absolute bottom-1 left-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => handleMoveImage(index, 'left')}
                      disabled={disabled}
                    >
                      <MoveLeft className="h-3 w-3" />
                    </Button>
                  )}
                  {index < images.length - 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => handleMoveImage(index, 'right')}
                      disabled={disabled}
                    >
                      <MoveRight className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              )}

              {/* Image index */}
              <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </Card>
          </div>
        ))}

        {/* Add new image upload */}
        {canAddMore && (
          <ImageUpload
            variant="compact"
            size={size}
            maxSizeMB={maxSizeMB}
            disabled={disabled}
            placeholder={placeholder}
            onImageChange={(file) => {
              if (file) {
                const url = URL.createObjectURL(file);
                handleImageUpload(file, url);
              }
            }}
          />
        )}
      </div>

      {/* Info text */}
      <div className="text-sm text-gray-500">
        {images.length} of {maxImages} images uploaded
        {!canAddMore && " (Maximum reached)"}
      </div>
    </div>
  );
};

export default ImageList;
