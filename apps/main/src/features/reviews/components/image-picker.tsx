"use client";

import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
	images: File[];
	imagePreviews: string[];
	onChange: (files: File[], previews: string[]) => void;
	maxImages?: number;
	disabled?: boolean;
}

export function ImagePicker({
	images,
	imagePreviews,
	onChange,
	maxImages = 10,
	disabled = false,
}: ImagePickerProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		const remainingSlots = maxImages - images.length;

		if (files.length === 0) return;

		const validFiles = files
			.slice(0, remainingSlots)
			.filter((file) => file.type.startsWith("image/"));

		if (validFiles.length === 0) return;

		// Create preview URLs
		const newPreviews = validFiles.map((file) => URL.createObjectURL(file));

		onChange([...images, ...validFiles], [...imagePreviews, ...newPreviews]);

		// Reset input
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleRemove = (index: number) => {
		// Revoke the preview URL to free memory
		URL.revokeObjectURL(imagePreviews[index]);

		const newImages = images.filter((_, i) => i !== index);
		const newPreviews = imagePreviews.filter((_, i) => i !== index);

		onChange(newImages, newPreviews);
	};

	const canAddMore = images.length < maxImages;

	return (
		<div className="space-y-3">
			{/* Image Grid */}
			{imagePreviews.length > 0 && (
				<div className="grid grid-cols-5 gap-2">
					{imagePreviews.map((preview, index) => (
						<div
							key={index}
							className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group"
						>
							<img
								src={preview}
								alt={`Preview ${index + 1}`}
								className="w-full h-full object-cover"
							/>
							{!disabled && (
								<button
									type="button"
									onClick={() => handleRemove(index)}
									className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<X className="w-3 h-3" />
								</button>
							)}
						</div>
					))}
				</div>
			)}

			{/* Upload Button */}
			{canAddMore && !disabled && (
				<div>
					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						multiple
						onChange={handleFileSelect}
						className="hidden"
					/>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => fileInputRef.current?.click()}
						className="w-full"
					>
						<ImagePlus className="w-4 h-4 mr-2" />
						Thêm ảnh ({images.length}/{maxImages})
					</Button>
				</div>
			)}

			{/* Info Text */}
			<p className="text-xs text-gray-500">
				Bạn có thể thêm tối đa {maxImages} ảnh. Định dạng: JPG, PNG, WEBP
			</p>
		</div>
	);
}
