import { Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CartSummaryProps {
  totalOriginal: number
  totalAfterDiscount: number
  selectedItemsCount: number
  onCheckout: () => void
}

export function CartSummary({
  totalOriginal,
  totalAfterDiscount,
  selectedItemsCount,
  onCheckout
}: CartSummaryProps) {
  const discount = totalOriginal - totalAfterDiscount
  const hasDiscount = discount > 0

  return (
    <div className="w-80">
      <Card className="p-4 sticky top-24 mt-11">
        {/* Promotions Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Tiki Khuyến Mãi</span>
            <div className="flex items-center text-sm text-gray-600">
              <span>Có thể chọn 2</span>
              <Info className="h-4 w-4 ml-1" />
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start text-blue-500 hover:text-blue-600">
            <span className="truncate">Mua thêm để freeship 15k cho đơn...</span>
            <span className="shrink-0 ml-2">{">"}</span>
          </Button>
        </div>

        {/* Price Summary */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tổng tiền hàng</span>
            <span className="font-medium">{totalOriginal.toLocaleString()}đ</span>
          </div>
          
          {hasDiscount && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Giảm giá trực tiếp</span>
              <span>-{discount.toLocaleString()}đ</span>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Tổng tiền thanh toán</span>
            <span className="text-red-500 text-xl font-bold">
              {totalAfterDiscount.toLocaleString()}đ
            </span>
          </div>
          
          <p className="text-xs text-gray-500 text-right">
            (Đã bao gồm VAT nếu có)
          </p>
        </div>

        {/* Checkout Button */}
        <Button 
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-3"
          onClick={onCheckout}
          disabled={selectedItemsCount === 0}
        >
          Mua Hàng ({selectedItemsCount})
        </Button>
      </Card>
    </div>
  )
}