"use client";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfoSection from "./basic-info-section/basic-info-section";
import { toast } from "sonner";
import FloatingNotificationBar from "@/features/notifications/floating-notification-bar";
import { useCreateProduct, useGetProductById, useUpdateProduct } from "../../hook";
import { ErrorResponse } from "@/lib/clients/types/ErrorResponse";
import { NewProductFormData, NewProductFormSchema } from "@/lib/validations";
import { useAuth } from "@/features/auth/hook";
import ProductDetailsSection from "./product-details-section/product-details-section";
import SalesInfoSection from "./sales-info-section/sales-info-section";
import PublishCardForm from "./publish-card-form";
import ShippingSection from "./shipping-section/shipping-section";
import OthersInfoSection from "./others-info-section";
import { useVariantFormIntegration } from "./variants/hook";
import VerticalSectionsNav from "@/components/navigations/vertical-sections-nav";
import ProductFormSkeleton from "./product-form-skeleton";
import { useEffect } from "react";
import { useProductMediaStore, useVariantStore } from "@/stores";

type FormMode = 'create' | 'update';

interface NewProductFormProps {
	mode?: FormMode;
	productId?: string;
}

export default function NewProductForm({ mode = 'create', productId }: NewProductFormProps) {
	const { shop, loading } = useAuth();
	const { product, isLoading: isLoadingProduct } = useGetProductById(productId || '');
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors, isDirty },
	} = useForm<NewProductFormData>({
		resolver: zodResolver(NewProductFormSchema),
		defaultValues: {
			name: "",
			category: "",
			description: "<p></p>",
			sku: "",
			specs: {
				brand: "",
				packageSize: "",
				activeIngredients: "",
				ingredients: "",
				quantity: "",
				responsibleManufacturingAddress: "",
				weightValue: "",
				weightUnit: "g",
				packagingType: "Type A",
				productSize: "",
				packagingMaterial: "",
			},
			originalPrice: "",
			salePrice: "",
			stockQuantity: "",
			maxPurchaseQuantity: "",
			status: "ACTIVE",
			isNew: "New",
			shippingInfo: {
				weightAfterPackaging: "",
				dimensions: {
					width: "",
					length: "",
					height: "",
				},
			},
		},
	});
	const { createProduct } = useCreateProduct();
	const { updateProduct } = useUpdateProduct();
	const {
		getSelectedVariantsForSubmission,
		hasSelectedVariants,
		resetAllVariants,
	} = useVariantFormIntegration();
	const { setCoverImage, setImages } = useProductMediaStore();
	const { setVariants } = useVariantStore();

	// Pre-populate form when in update mode
	useEffect(() => {
		if (mode === 'update' && product) {
			// Set form values
			reset({
				name: product.name || "",
				category: product.categoryId ? `${product.categoryId}-${product.categoryPath?.[product.categoryPath.length - 1]?.name || ''}` : "",
				description: product.description || "<p></p>",
				sku: product.variants?.[0]?.sku || "",
				specs: {
					brand: product.specs?.brand || "",
					packageSize: product.specs?.packageSize || "",
					activeIngredients: product.specs?.activeIngredients || "",
					ingredients: product.specs?.ingredients || "",
					quantity: product.specs?.quantity || "",
					responsibleManufacturingAddress: product.specs?.responsibleManufacturingAddress || "",
					weightValue: product.specs?.weightValue || "",
					weightUnit: product.specs?.weightUnit || "g",
					packagingType: product.specs?.packagingType || "Type A",
					productSize: product.specs?.productSize || "",
					packagingMaterial: product.specs?.packagingMaterial || "",
				},
				originalPrice: product.variants?.[0]?.originalPrice?.toString() || "",
				salePrice: product.variants?.[0]?.salePrice?.toString() || "",
				stockQuantity: product.variants?.[0]?.stockQuantity?.toString() || "",
				maxPurchaseQuantity: "",
				status: product.status || "ACTIVE",
				isNew: "New",
				shippingInfo: {
					weightAfterPackaging: "",
					dimensions: {
						width: "",
						length: "",
						height: "",
					},
				},
			});

			// Set cover image and product images
			if (product.coverImage) {
				// Store URL string, not File
				setCoverImage(product.coverImage as any);
			}
			if (product.images && product.images.length > 0) {
				// Store URL strings for existing images
				setImages(product.images.map((url, idx) => ({
					id: `existing_${idx}`,
					file: url as any, // Store URL string
				})));
			}

			// Set variants if they exist
			if (product.variants && product.variants.length > 0) {
				// Initialize variant store with existing variants - preserve database IDs
				const formattedVariants = product.variants.map(v => ({
					id: v.id, // Keep the original database ID as string
					name: Object.values(v.attributes || {}).join('/'),
					originalPrice: v.originalPrice?.toString() || "",
					salePrice: v.salePrice?.toString() || "",
					available: v.stockQuantity?.toString() || "",
					sku: v.sku || "",
					selected: true,
					images: v.images?.map((url, idx) => ({
						id: `variant_${v.id}_${idx}`,
						file: url as any, // Store URL string
					})) || [],
					combination: Object.entries(v.attributes || {}).map(([key, value]) => ({
						name: key,
						value: String(value),
					})),
				}));
				setVariants(formattedVariants);
			}
		}
	}, [mode, product, reset, setCoverImage, setImages, setVariants]);

	const onSubmit = async (data: NewProductFormData) => {
		if (!shop?.id) {
			return;
		}
		const selectedVariants = getSelectedVariantsForSubmission();
		const hasVariants = selectedVariants.length > 0;
		const submitVariants = hasVariants
			? selectedVariants
			: [
					{
						originalPrice: data.originalPrice || "0",
						salePrice: data.salePrice || "0",
						stockQuantity: data.stockQuantity,
						sku: data.sku,
						selected: true,
						attributes: {},
						images: [],
					},
				];

		const productData = {
			product: {
				shopId: shop?.id,
				name: data.name,
				categoryId: parseInt(data.category.split("-")[0]),
				description: data.description,
				brand: {
					id: "1",
				},
				specs: {
					...data.specs,
					packageSize: data.specs.packageSize
						? String(data.specs.packageSize)
						: "",
				},
				status: data.status,
			},
			variants: submitVariants,
			shippingInfo: {
				...data.shippingInfo,
			},
		};

		if (mode === 'update' && productId) {
			await updateProduct(
				{ productId, data: productData },
				{
					onError: (error: unknown) => {
						const err = error as ErrorResponse;
						toast.error(`Error updating product`, {
							description: err.detail,
						});
					},
					onSuccess: () => {
						toast.success("Product updated successfully!");
					},
				},
			);
		} else {
			await createProduct(
				productData,
				{
					onError: (error: unknown) => {
						const err = error as ErrorResponse;
						toast.error(`Error creating product`, {
							description: err.detail,
						});
					},
					onSuccess: () => {
						toast.success("Product created successfully!");
						handleReset();
					},
				},
			);
		}
	};
	const handleReset = () => {
		reset();
		resetAllVariants();
	};

	return (
		<>
			{loading || (mode === 'update' && isLoadingProduct) ? (
				<ProductFormSkeleton />
			) : (
				<div className="relative flex justify-center">
					<FloatingNotificationBar
						isExpanded={isDirty || hasSelectedVariants()}
					>
						<div className="flex items-center justify-between w-full">
							<span className="font-semibold flex items-center ml-4">
								<TriangleAlert className="size-5 mr-2" />
								<span className="text-base line-clamp-1">
									Unsaved product
								</span>
							</span>
							<span className="flex items-center rounded-full bg-gray-700 text-sm mr-1 h-fit justify-center p-1 gap-1">
								<Button
									className="bg-green-500 hover:bg-green-500/90 rounded-full px-3 py-1 h-fit"
									onClick={handleSubmit(onSubmit)}
								>
									Save
								</Button>
								<Button
									className="bg-transparent hover:bg-red-500 rounded-full px-3 py-1 h-fit"
									onClick={handleReset}
								>
									Discard
								</Button>
							</span>
						</div>
					</FloatingNotificationBar>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className=" space-x-4 relative flex"
					>
						<div>
							<BasicInfoSection
								register={register}
								control={control}
								errors={errors}
								isDirty={isDirty}
							/>
							<ProductDetailsSection
								control={control}
								errors={errors}
								isDirty={isDirty}
							/>
							<SalesInfoSection
								register={register}
								control={control}
								errors={errors}
							/>
							<ShippingSection register={register} errors={errors} />
							<OthersInfoSection
								register={register}
								control={control}
								errors={errors}
							/>
						</div>
						<div className="sticky top-20 h-fit space-y-4">
							<VerticalSectionsNav />
							<PublishCardForm
								register={register}
								control={control}
								errors={errors}
							/>
						</div>
					</form>
				</div>
			)}
		</>
	);
}
