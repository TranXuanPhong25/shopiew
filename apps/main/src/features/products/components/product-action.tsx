"use client"

import QuantityInput from "@/components/form/quanitty-input";
import { MapPin, AlertCircle, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShoppingCartPlus from "@/components/icon/shopping-cart-plus";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useProductPageContext } from "../context";
import { useVariantSelectionStore } from "../../../stores/variant-selection-store";
import React, { useEffect } from "react";
import AddToCartBtn from "./add-to-cart-btn";

export default function ProductAction() {
    // Get product data from context (non-variant related)
    const { product } = useProductPageContext();
    
    // Get variant selection state from store
    const {
        selectedVariant,
        currentVariants,
        currentPrice,
        currentInventory,
        isValid,
        clearSelection: onClearSelection,
        setVariants
    } = useVariantSelectionStore();
    console.log(formatCurrency(currentPrice.originalPrice * 2))
    // Initialize store with variants when product loads
    useEffect(() => {
        if (product?.variants) {
            setVariants(product.variants);
        }
    }, [product?.variants, setVariants]);
    const [quantity, setQuantity] = React.useState(1);
    useEffect(() => {
        if (currentInventory.available < quantity) {
            setQuantity(currentInventory.available||1)
        }
    }, [currentInventory.available, quantity]);
    const hasVariants = Object.keys(selectedVariant).length > 0 || currentVariants !== null;
    return (
        <div className="space-y-4">
            {/* Delivery info */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="size-4" />
                <span>Delivery to <span className="font-medium text-gray-800">Hanoi</span></span>
            </div>

            {/* Selected Variant Display */}
            {Object.keys(selectedVariant).length > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <span className="text-gray-700 font-semibold">Selected variant:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(selectedVariant).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-1">
                                        <span className="text-xs text-gray-600 font-medium">{key}:</span>
                                        <Badge variant="secondary" className="text-xs bg-orange-200 text-orange-800 border-orange-300">
                                            {String(value)}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            {selectedVariant?.sku && (
                                <p className="text-xs text-gray-500 mt-2">
                                    SKU: {selectedVariant.sku}
                                </p>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearSelection}
                            className="h-6 px-2 text-gray-400 hover:text-red-500 hover:bg-red-50"
                            title="Clear selection"
                        >
                            <X className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center justify-between">
                {currentInventory.available > 0 ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        In stock: {currentInventory.available}
                    </Badge>
                ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Out of stock
                    </Badge>
                )}

                {/* Fast delivery badge */}
                {currentInventory.available > 0 && (
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                        <Truck className="w-3 h-3 mr-1" />
                        Fast delivery
                    </Badge>
                )}
            </div>

            {/* Quantity Selection */}
            {currentInventory.available > 0 && isValid && (
                <QuantityInput
                    value={quantity}
                    max={Math.min(currentInventory.available, 99)}
                    onChange={setQuantity}
                />
            )}

            {/* Price Display */}
            {
                currentVariants.length == 1 && (
                    <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-red-500">
                                {formatCurrency(currentPrice.originalPrice * quantity)}
                            </span>
                            {currentPrice.originalPrice > currentPrice.salePrice && (
                                <>
                                    <span className="text-lg text-gray-400 line-through">
                                        {formatCurrency(currentPrice.originalPrice * quantity)}
                                    </span>
                                    <Badge variant="destructive" className="text-xs">
                                        -{Math.round(((currentPrice.originalPrice - currentPrice.salePrice) / currentPrice.originalPrice) * 100)}%
                                    </Badge>
                                </>
                            )}
                        </div>

                    </div>
                )
            }

            {/* Action Buttons */}
            <div className="space-y-2">
                <Button
                    className="w-full bg-red-500/90 hover:bg-red-500"
                    disabled={hasVariants && !isValid || currentInventory.available === 0}
                    size="lg"
                >
                    {hasVariants && !isValid ? "Select variant" : "Buy now"}
                </Button>

                <AddToCartBtn quantity={quantity}/>
            </div>

            {/* Additional info */}
            {hasVariants && !isValid && (
                <p className="text-sm text-orange-600 text-center italic">
                    Please select product options to continue
                </p>
            )}
        </div>
    );
}