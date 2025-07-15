"use client"

import {useState} from "react"
import {Minus, Plus, Trash2, Store, Info} from 'lucide-react'
import {Button} from "@/src/components/ui/button"
import {Checkbox} from "@/src/components/ui/checkbox"
import {Card} from "@/src/components/ui/card"
import Image from "next/image"

interface CartItem {
    id: string
    shopName: string
    name: string
    price: number
    originalPrice: number
    quantity: number
    image: string
}

export default function ShoppingCart() {
    const [items, setItems] = useState<CartItem[]>([
        {
            id: "1",
            shopName: "NewShop Official",
            name: "Phiếu Luyện Viết Cùng Gấu Kiki 2. Luyện Viết Bảng Chữ Cái",
            price: 24650,
            originalPrice: 29000,
            quantity: 1,
            image: "https://placehold.co/80x80.png"
        },
        {
            id: "2",
            shopName: "NewShop Official",
            name: "Hlasfjalsdkf",
            price: 24650,
            originalPrice: 29000,
            quantity: 1,
            image: "https://placehold.co/80x80.png"
        }
        ,
        {
            id: "3",
            shopName: "NewShop Official",
            name: "Hlasfjalsdkf",
            price: 24650,
            originalPrice: 29000,
            quantity: 1,
            image: "https://placehold.co/80x80.png"
        }
        ,
        {
            id: "4",
            shopName: "NewShop Official",
            name: "Hlasfjalsdkf",
            price: 24650,
            originalPrice: 29000,
            quantity: 1,
            image: "https://placehold.co/80x80.png"
        },
        {
            id: "5",
            shopName: "NewShop Official",
            name: "Hlasfjalsdkf",
            price: 24650,
            originalPrice: 29000,
            quantity: 1,
            image: "https://placehold.co/80x80.png"
        }
    ])

    const [selectedItems, setSelectedItems] = useState<string[]>([items[0].id])

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setItems(items.map(item =>
            item.id === id ? {...item, quantity: newQuantity} : item
        ))
    }

    const totalOriginal = items.reduce((sum, item) =>
        selectedItems.includes(item.id) ? sum + (item.originalPrice * item.quantity) : sum, 0
    )

    const totalAfterDiscount = items.reduce((sum, item) =>
        selectedItems.includes(item.id) ? sum + (item.price * item.quantity) : sum, 0
    )

    const discount = totalOriginal - totalAfterDiscount

    return (
        <div className="max-w-7xl mx-auto my-4 ">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Cart Items */}
                <div className="flex-1">
                    <h1 className="text-xl font-semibold mb-4 ml-4">Your Cart</h1>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={selectedItems.length === items.length}
                                    onCheckedChange={(checked: boolean) => {
                                        setSelectedItems(checked ? items.map(item => item.id) : [])
                                    }}
                                />
                                <span className="text-sm text-gray-600">Tất cả (1 sản phẩm)</span>
                            </div>
                            <div className="flex items-center gap-8 text-sm text-gray-600">
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <Trash2 className="h-4 w-4"/>
                            </div>
                        </div>

                        {items.map((item) => (
                            <Card key={item.id} className="p-4">
                                <div className="flex items-center gap-4">
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={(checked: boolean) => {
                                            setSelectedItems(checked
                                                ? [...selectedItems, item.id]
                                                : selectedItems.filter(id => id !== item.id)
                                            )
                                        }}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Store className="h-4 w-4"/>
                                        <span className="text-sm">{item.shopName}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mt-4">
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={(checked: boolean) => {
                                            setSelectedItems(checked
                                                ? [...selectedItems, item.id]
                                                : selectedItems.filter(id => id !== item.id)
                                            )
                                        }}
                                    />
                                    <Image src={item.image || "/placeholder.svg"} alt={item.name}
                                           width={80} height={80}
                                           className="w-20 h-20 object-cover rounded"/>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium truncate">{item.name}</h3>
                                        <p className="text-xs text-gray-500 mt-1">Sách không hỗ trợ Bookcare</p>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <div className="text-red-500">{item.price.toLocaleString()}đ</div>
                                            <div
                                                className="text-sm text-gray-500 line-through">{item.originalPrice.toLocaleString()}đ
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-4 w-4"/>
                                            </Button>
                                            <span className="w-12 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                        <div className="text-red-500 w-24 text-right">
                                            {(item.price * item.quantity).toLocaleString()}đ
                                        </div>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className=" w-80h-full">
                    <Card className="p-4 sticky  top-24 mt-11 ">
                        <div className="flex items-center justify-between mb-4">
                            <span>Tiki Khuyến Mãi</span>
                            <div className="flex items-center text-sm text-gray-600">
                                <span>Có thể chọn 2</span>
                                <Info className="h-4 w-4 ml-1"/>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full justify-start text-blue-500">
                            <span className="truncate">Mua thêm để freeship 15k cho đơn...</span>
                            <span className="shrink-0 ml-2">{">"}</span>
                        </Button>

                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between">
                                <span>Tổng tiền hàng</span>
                                <span>{totalOriginal.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between text-green-500">
                                <span>Giảm giá trực tiếp</span>
                                <span>-{discount.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between font-medium">
                                <span>Tổng tiền thanh toán</span>
                                <span className="text-red-500 text-xl">{totalAfterDiscount.toLocaleString()}đ</span>
                            </div>
                            <p className="text-xs text-gray-500 text-right">(Đã bao gồm VAT nếu có)</p>
                        </div>

                        <Button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white">
                            Mua Hàng ({selectedItems.length})
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}