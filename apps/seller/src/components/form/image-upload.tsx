'use client';

import Image from 'next/image';
import {useCallback, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {cn} from '@/lib/utils';
import {Camera, ImageIcon, Upload, X} from 'lucide-react';

interface ImageUploadProps {
   onImageChange?: (file: File | null) => void;
   maxSizeMB?: number;
   className?: string;
   disabled?: boolean;
   placeholder?: string;
   size?: 'sm' | 'md' | 'lg' | 'xl';
   variant?: 'default' | 'compact';
   initialImageUrl?: string;
   label?: string;
}

export const ImageUploadSizeClasses = {
   sm: 'w-20 h-20',
   md: 'w-28 h-28',
   lg: 'w-36 h-36',
   xl: 'w-40 h-40'
};

const ImageUpload = ({
   onImageChange,
   maxSizeMB = 5,
   className,
   disabled = false,
   placeholder = "",
   size = 'md',
   variant = 'default',
   initialImageUrl,
   label
}: ImageUploadProps) => {
   const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl||null);
   const [isDragOver, setIsDragOver] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const validateFile = useCallback((file: File): string | null => {
      // Check file type
      if (!file.type.startsWith('image/')) {
         return 'Please select an image file';
      }

      // Check file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
         return `File size must be less than ${maxSizeMB}MB`;
      }

      return null;
   }, [maxSizeMB]);
   const handleFileSelect = useCallback(async (file: File) => {
      setError(null);
      setIsLoading(true);

      const validationError = validateFile(file);
      if (validationError) {
         setError(validationError);
         setIsLoading(false);
         return;
      }

      try {
         // Create preview URL
         const url = URL.createObjectURL(file);
         setPreviewUrl(url);
         // Call callbacks
         onImageChange?.(file);
      } catch (err) {
         setError('Failed to process image');
      } finally {
         setIsLoading(false);
      }
   }, [validateFile, onImageChange]);
   const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         handleFileSelect(file);
         if (variant === 'compact') {
            handleRemoveImage();
         }
      }
   }, [handleFileSelect]);

   const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
         setIsDragOver(true);
      }
   }, [disabled]);

   const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
   }, []);

   const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length > 0) {
         handleFileSelect(imageFiles[0]);
         if (variant === 'compact') {
            handleRemoveImage();
         }  
      }
   }, [disabled, handleFileSelect]);

   const handleRemoveImage = useCallback(() => {
      if (previewUrl && !initialImageUrl) {
         URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setError(null);
      onImageChange?.(null);

      // Clear file input
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   }, [previewUrl, initialImageUrl, onImageChange]);

   const handleClick = useCallback(() => {
      if (!disabled) {
         fileInputRef.current?.click();
      }
   }, [disabled]);

   const renderCompactView = () => (
      <Card
         className={cn(
            "relative overflow-hidden cursor-pointer transition-all duration-200",
            "border-2 border-dashed border-gray-300 hover:border-gray-400",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            isDragOver && "border-primary bg-primary/5",
            disabled && "cursor-not-allowed opacity-50",
            previewUrl && "border-solid border-gray-200",
            ImageUploadSizeClasses[size]
         )}
         onClick={handleClick}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
      >
         <div className="w-full h-full relative flex items-center justify-center">
            {isLoading ? (
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            ) : previewUrl ? (
               <>
                  <Image
                     src={previewUrl}
                     alt="Preview"
                     fill
                     className="object-cover"
                     sizes={`${ImageUploadSizeClasses[size].split(' ')[0].slice(2)}`}
                  />
                  <Button
                     type="button"
                     variant="destructive"
                     size="icon"
                     className="absolute top-1 right-1 h-6 w-6 rounded-full"
                     onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                     }}
                  >
                     <X className="h-3 w-3" />
                  </Button>
               </>
            ) : (
               <div className="text-gray-400">
                  {isDragOver ? (
                     <Upload className="h-8 w-8" />
                  ) : (
                     <ImageIcon className="h-8 w-8" />
                  )}
               </div>
            )}
         </div>
      </Card>
   );

   const renderDefaultView = () => (
      <Card
         className={cn(
            "relative overflow-hidden cursor-pointer transition-all duration-200",
            "border-2 border-dashed border-gray-300 hover:border-gray-400",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
            isDragOver && "border-primary bg-primary/5",
            disabled && "cursor-not-allowed opacity-50",
            previewUrl && "border-solid border-gray-200"
         )}
         onClick={handleClick}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
      >
         <div className={cn("aspect-square relative  flex items-center justify-center", ImageUploadSizeClasses[size])}>
            {isLoading ? (
               <div className="flex flex-col items-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-sm text-gray-500">Uploading...</p>
               </div>
            ) : previewUrl ? (
               <>
                  <Image
                     src={previewUrl}
                     alt="Preview"
                     fill
                     className="object-cover"
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Button
                     type="button"
                     variant="destructive"
                     size="icon"
                     className="absolute top-2 right-2 h-8 w-8 rounded-full"
                     onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                     }}
                  >
                     <X className="h-4 w-4" />
                  </Button>
               </>
            ) : (
               <div className="text-center ">
                  <div className="mx-auto h-12 w-12 text-gray-400">
                     {isDragOver ? (
                        <Upload className="h-full w-full" />
                     ) : (
                        <Camera className="h-full w-full" />
                     )}
                  </div>
                  <div className="text-center px-2">
                     <p className="text-sm font-medium text-gray-900">
                        {placeholder}
                     </p>
                     <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to {maxSizeMB}MB
                     </p>
                  </div>

               </div>
            )}
         </div>
      </Card>
   );

   return (
      <div className={cn("space-y-2 relative", className)}>
         {variant === 'compact' ? renderCompactView() : renderDefaultView()}

         <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
         />
         {label && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2 text-center">
               {label}
            </div>
         )}
         {error && (
            <div className="flex items-center space-x-2">
               <Badge variant="destructive" className="text-xs">
                  Error
               </Badge>
               <p className="text-xs text-red-600">{error}</p>
            </div>
         )}
      </div>
   );
};

export default ImageUpload;
