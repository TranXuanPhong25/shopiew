import { useVariantStore } from "@/stores";

import { RawProductVariant } from "../../../model";

export const useVariantFormIntegration = () => {
	const { variants, resetVariants, hasSelectedVariants } = useVariantStore();

	const getSelectedVariantsForSubmission = (): RawProductVariant[] => {
		return variants
			.filter((variant) => variant.selected)
			.map((variant) => ({
				name: variant.name,
				originalPrice: variant.originalPrice
					? variant.originalPrice.replace(/\.|,/g, "")
					: "0",
				salePrice: variant.salePrice
					? variant.salePrice.replace(/\.|,/g, "")
					: "0",
				sku: variant.sku || "",
				stockQuantity: variant.available || "0",
				attributes:
					variant.combination?.reduce(
						(obj, item) => ({ ...obj, [item.name]: item.value }),
						{},
					) || {},
			}));
	};

	const resetAllVariants = () => {
		resetVariants();
	};

	return {
		variants,
		getSelectedVariantsForSubmission,
		hasSelectedVariants,
		resetAllVariants,
	};
};
