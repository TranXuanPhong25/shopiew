import { create } from "zustand";
import {
	ProductVariant,
	SelectedVariant,
	VariantOption,
	VariantPrice,
	VariantInventory,
	VariantOptionValue,
} from "../features/products/types";

interface VariantSelectionState {
	// State
	selectedVariant: SelectedVariant;
	variants: ProductVariant[];
	options: VariantOption[];

	// Computed values
	currentVariants: ProductVariant[];
	isValid: boolean;
	currentPrice: VariantPrice;
	currentInventory: VariantInventory;

	// Actions
	selectVariant: (optionName: string, value: string) => void;
	clearSelection: () => void;
	setVariants: (variants: ProductVariant[]) => void;
	reset: () => void;
}

const initialState = {
	selectedVariant: {},
	variants: [],
	options: [],
	currentVariants: [],
	isValid: false,
	currentPrice: {
		originalPrice: 0,
		salePrice: 0,
		maxPrice: 0,
	},
	currentInventory: {
		available: 0,
		reserved: 0,
		total: 0,
	},
};

export const useVariantSelectionStore = create<VariantSelectionState>(
	(set, get) => ({
		...initialState,

		selectVariant: (optionName: string, value: string) => {
			set((state) => {
				const newSelectedVariant = {
					...state.selectedVariant,
					[optionName]: value,
				};

				const newCurrentVariants = state.variants.filter(
					(variant: ProductVariant) => {
						if (!variant.attributes) return false;
						return Object.entries(newSelectedVariant).every(
							([key, value]) => variant.attributes![key] === value,
						);
					},
				);

				const newIsValid =
					state.options.length > 0 &&
					state.options.every(
						(option) => newSelectedVariant[option.name] !== undefined,
					) &&
					newCurrentVariants.length !== 0;

				// Calculate new price
				const maxPrice = Math.max(
					...newCurrentVariants.map(
						(v: ProductVariant) => v.originalPrice,
					),
					0,
				);
				let newCurrentPrice: VariantPrice;

				if (!newCurrentVariants.length) {
					const originalPrices = state.variants.map(
						(v: ProductVariant) => v.originalPrice,
					);
					const salePrices = state.variants.map(
						(v: ProductVariant) => v.salePrice,
					);
					const lowestOriginal = Math.min(
						...originalPrices,
						originalPrices[0] || 0,
					);
					const lowestSale = Math.min(...salePrices, salePrices[0] || 0);
					newCurrentPrice = {
						originalPrice: lowestOriginal,
						salePrice: lowestSale,
						maxPrice,
					};
				} else {
					const variant = newCurrentVariants[0];
					newCurrentPrice = {
						originalPrice: variant.originalPrice,
						salePrice: variant.salePrice,
						maxPrice,
					};
				}

				// Calculate new inventory
				const inStocks = newCurrentVariants.reduce(
					(sum: number, v: ProductVariant) => {
						return sum + v.stockQuantity;
					},
					0,
				);

				const newCurrentInventory: VariantInventory = {
					available: inStocks,
					reserved: 0,
					total: inStocks,
				};

				return {
					selectedVariant: newSelectedVariant,
					currentVariants: newCurrentVariants,
					isValid: newIsValid,
					currentPrice: newCurrentPrice,
					currentInventory: newCurrentInventory,
				};
			});
		},

		clearSelection: () => {
			set((state) => {
				const newCurrentVariants = state.variants;

				// Calculate price for all variants
				const originalPrices = state.variants.map(
					(v: ProductVariant) => v.originalPrice,
				);
				const salePrices = state.variants.map(
					(v: ProductVariant) => v.salePrice,
				);
				const lowestOriginal = Math.min(
					...originalPrices,
					originalPrices[0] || 0,
				);
				const lowestSale = Math.min(...salePrices, salePrices[0] || 0);
				const maxPrice = Math.max(...originalPrices, 0);

				const newCurrentPrice: VariantPrice = {
					originalPrice: lowestOriginal,
					salePrice: lowestSale,
					maxPrice,
				};

				// Calculate inventory for all variants
				const inStocks = state.variants.reduce(
					(sum: number, v: ProductVariant) => {
						return sum + v.stockQuantity;
					},
					0,
				);

				const newCurrentInventory: VariantInventory = {
					available: inStocks,
					reserved: 0,
					total: inStocks,
				};

				return {
					selectedVariant: {},
					currentVariants: newCurrentVariants,
					isValid: false,
					currentPrice: newCurrentPrice,
					currentInventory: newCurrentInventory,
				};
			});
		},

		setVariants: (variants: ProductVariant[]) => {
			set((state) => {
				// Generate variant options from variants
				const optionMap: Record<string, Set<string>> = {};
				const optionImages: Record<string, Record<string, string[]>> = {};

				variants.forEach((variant: ProductVariant) => {
					if (!variant.attributes) return;

					Object.entries(variant.attributes).forEach(([key, value]) => {
						const stringValue = String(value);

						if (!optionMap[key]) {
							optionMap[key] = new Set();
							optionImages[key] = {};
						}
						optionMap[key].add(stringValue);

						if (!optionImages[key][stringValue]) {
							optionImages[key][stringValue] = [];
						}
						if (variant.images && variant.images.length > 0) {
							optionImages[key][stringValue].push(...variant.images);
						}
					});
				});

				const newOptions: VariantOption[] = Object.entries(optionMap).map(
					([name, valueSet], index) => {
						const values: VariantOptionValue[] = Array.from(valueSet).map(
							(value, valueIndex) => ({
								id: `${name}-${value}-${valueIndex}`,
								value,
								label: value,
								images: optionImages[name][value] || [],
								available: true,
								disabled: false,
							}),
						);

						return {
							id: `option-${name}-${index}`,
							name,
							label: name,
							type:
								name.toLowerCase() === "color"
									? "color"
									: name.toLowerCase() === "size"
										? "size"
										: "text",
							values,
						};
					},
				);

				// Calculate initial price and inventory
				const originalPrices = variants.map(
					(v: ProductVariant) => v.originalPrice,
				);
				const salePrices = variants.map((v: ProductVariant) => v.salePrice);
				const lowestOriginal = Math.min(
					...originalPrices,
					originalPrices[0] || 0,
				);
				const lowestSale = Math.min(...salePrices, salePrices[0] || 0);
				const maxPrice = Math.max(...originalPrices, 0);

				const newCurrentPrice: VariantPrice = {
					originalPrice: lowestOriginal,
					salePrice: lowestSale,
					maxPrice,
				};

				const inStocks = variants.reduce(
					(sum: number, v: ProductVariant) => {
						return sum + v.stockQuantity;
					},
					0,
				);

				const newCurrentInventory: VariantInventory = {
					available: inStocks,
					reserved: 0,
					total: inStocks,
				};

				return {
					variants,
					options: newOptions,
					currentVariants: variants,
					currentPrice: newCurrentPrice,
					currentInventory: newCurrentInventory,
					selectedVariant: {},
					isValid: false,
				};
			});
		},

		reset: () => set(initialState),
	}),
);
