"use client";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfoSection from "./basic-info-section/basic-info-section";
import { toast } from "sonner";
import FloatingNotificationBar from "@/features/notifications/floating-notification-bar";
import { useCreateProduct } from "../../hook";
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

export default function NewProductForm() {
	const { shop, loading } = useAuth();
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
	const {
		getSelectedVariantsForSubmission,
		hasSelectedVariants,
		resetAllVariants,
	} = useVariantFormIntegration();

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
		await createProduct(
			{
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
			},
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
	};
	const handleReset = () => {
		reset();
		resetAllVariants();
	};

	return (
		<>
			{loading ? (
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
