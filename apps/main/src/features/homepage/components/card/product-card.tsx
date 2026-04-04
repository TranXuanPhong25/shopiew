"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAddItemToCart } from "@/features/carts/hooks/use-add-item-to-cart";
import ProductService from "@/features/products/service";
import { ProductCardProps } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WISHLIST_STORAGE_KEY = "wishlist_product_ids_v1";

type QuickAddPayload = {
	productVariantID: number;
	shopID: string;
};

export default function ProductCard({
	product,
	compact = false,
}: {
	product: ProductCardProps;
	compact?: boolean;
}) {
	const { mutateAsync: addItemToCart, isPending: isQuickAdding } =
		useAddItemToCart();
	const quickAddRef = useRef<QuickAddPayload | null>(null);
	const [isWished, setIsWished] = useState(false);

	const loadWishlist = useCallback(() => {
		if (typeof window === "undefined") return [] as number[];

		try {
			const rawValue = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
			if (!rawValue) return [];

			const parsed = JSON.parse(rawValue);
			if (!Array.isArray(parsed)) return [];

			return parsed
				.map((id) => Number(id))
				.filter((id) => Number.isInteger(id));
		} catch {
			return [];
		}
	}, []);

	const saveWishlist = useCallback((ids: number[]) => {
		if (typeof window === "undefined") return;
		window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
	}, []);

	useEffect(() => {
		const wishedIds = loadWishlist();
		setIsWished(wishedIds.includes(product.id));
	}, [loadWishlist, product.id]);

	const resolveQuickAddPayload = useCallback(async () => {
		if (quickAddRef.current) return quickAddRef.current;

		const detail = await ProductService.getProductById(String(product.id));
		const firstVariantId = detail?.variants?.[0]?.id;
		const shopId = detail?.shopId;

		if (!firstVariantId || !shopId) {
			throw new Error("Product is unavailable for quick add");
		}

		const payload = {
			productVariantID: Number(firstVariantId),
			shopID: String(shopId),
		};

		if (!Number.isFinite(payload.productVariantID)) {
			throw new Error("Product variant is invalid");
		}

		quickAddRef.current = payload;
		return payload;
	}, [product.id]);

	const handleToggleWishlist = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			const wishedIds = loadWishlist();
			if (wishedIds.includes(product.id)) {
				const nextIds = wishedIds.filter((id) => id !== product.id);
				saveWishlist(nextIds);
				setIsWished(false);
				toast.success("Removed from wishlist");
				return;
			}

			const nextIds = [...new Set([...wishedIds, product.id])];
			saveWishlist(nextIds);
			setIsWished(true);
			toast.success("Added to wishlist");
		},
		[loadWishlist, product.id, saveWishlist],
	);

	const handleQuickAddToCart = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			try {
				const payload = await resolveQuickAddPayload();
				await addItemToCart({ ...payload, quantity: 1 });
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Failed to quick add this product";
				toast.error(message);
			}
		},
		[addItemToCart, resolveQuickAddPayload],
	);

	const discountPercent = Math.round(
		100 - (product.salePrice / product.originalPrice) * 100,
	);

	return (
		<Link href={`/products/${product.id}`} className="block group">
			<Card className="max-w-sm overflow-hidden border-0 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
				<div className="relative overflow-hidden">
					{/* Discount badge */}
					{discountPercent > 0 && (
						<div className="absolute top-2 left-2 z-10">
							<span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-sale-500 to-sale-600 text-white shadow-sm">
								-{discountPercent}%
							</span>
						</div>
					)}

					{/* Quick action buttons */}
					<div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
						<button
							className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:scale-110 transition-all"
							aria-label={`Add ${product.name} to wishlist`}
							onClick={handleToggleWishlist}
						>
							<Heart
								className={cn(
									"w-4 h-4 transition-colors",
									isWished
										? "fill-sale-500 text-sale-500"
										: "text-gray-600 hover:text-sale-500",
								)}
								aria-hidden="true"
							/>
						</button>
						<button
							className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:scale-110 transition-all"
							aria-label={`Quick add ${product.name} to cart`}
							onClick={handleQuickAddToCart}
							disabled={isQuickAdding}
						>
							<ShoppingCart
								className={cn(
									"w-4 h-4",
									isQuickAdding
										? "text-gray-400"
										: "text-gray-600 hover:text-brand-500",
								)}
								aria-hidden="true"
							/>
						</button>
					</div>

					{/* Product image */}
					<div className="aspect-square overflow-hidden bg-slate-50">
						<Image
							src={
								product.imageUrl || "https://placehold.co/400x400.png"
							}
							alt={product.name}
							width={400}
							height={400}
							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					</div>
				</div>

				<CardContent className="p-3">
					{/* Product Name */}
					<h3
						className={cn(
							"font-medium text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-brand-600 transition-colors",
							compact ? "text-sm" : "text-base",
						)}
					>
						{product.name}
					</h3>

					{/* Rating & Sold */}
					<div className="flex items-center gap-1 justify-between mt-2">
						<div className="flex items-center gap-1">
							<Star
								className="w-4 h-4 fill-amber-400 stroke-amber-400"
								aria-hidden="true"
							/>
							<span className="text-sm font-medium text-gray-700">
								{product.rating}
							</span>
						</div>
						<span className="text-xs text-muted-foreground">
							{product.soldQuantity
								? product.soldQuantity.toLocaleString()
								: 0}{" "}
							sold
						</span>
					</div>

					{/* Price */}
					<div className="flex items-baseline gap-2 mt-2">
						<span className="text-lg font-bold text-sale-600 tabular-nums">
							{new Intl.NumberFormat("vi-VN", {
								style: "currency",
								currency: "VND",
							}).format(product.salePrice)}
						</span>
						{discountPercent > 0 && (
							<span className="text-xs text-muted-foreground line-through tabular-nums">
								{new Intl.NumberFormat("vi-VN", {
									style: "currency",
									currency: "VND",
								}).format(product.originalPrice)}
							</span>
						)}
					</div>

					{/* Location */}
					<div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
						<MapPin className="w-3 h-3" aria-hidden="true" />
						<span>{product.soldAddress}</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
