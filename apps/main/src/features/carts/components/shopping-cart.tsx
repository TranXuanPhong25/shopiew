"use client"

import { CartHeader } from "./cart-header"
import { ShopSection } from "./shop-section"
import { CartSummary } from "./cart-summary"
import useCartPage from "../hooks/use-cart-page"

export default function ShoppingCart() {
    const shopName = "NewShop Official"

    const {
        selectedItems,
        handleSelectAll,
        handleShopToggle,
        handleItemToggle,
        handleRemoveItem,
        handleCheckout,
        totalOriginal,
        totalAfterDiscount,
        items,
        handleQuantityChange,
        isLoading,
        error
    } = useCartPage();
    if (isLoading) return <div className="min-h-[60vh]"/>;
    if (error) return <div>Error loading cart: {error.message}</div>;
    return (
        <div className="max-w-7xl mx-auto my-4 min-h-[60vh]">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Cart Items */}
                <div className="flex-1">
                    <h1 className="text-xl font-semibold mb-4 ml-4">Your Cart</h1>
                    <div className="space-y-4">
                        <CartHeader
                            selectedItemsCount={selectedItems.length}
                            totalItemsCount={items.length}
                            onSelectAll={handleSelectAll}
                        />

                        <ShopSection
                            shopName={shopName}
                            items={items}
                            selectedItems={selectedItems}
                            onToggleShopSelect={handleShopToggle}
                            onToggleItemSelect={handleItemToggle}
                            onQuantityChange={handleQuantityChange}
                            onRemoveItem={handleRemoveItem}
                        />
                    </div>
                </div>

                {/* Summary */}
                <CartSummary
                    totalOriginal={totalOriginal}
                    totalAfterDiscount={totalAfterDiscount}
                    selectedItemsCount={selectedItems.length}
                    onCheckout={handleCheckout}
                />
            </div>
        </div>
    )
}