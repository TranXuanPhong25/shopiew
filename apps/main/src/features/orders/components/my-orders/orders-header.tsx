import { Package } from "lucide-react";

export function OrdersHeader() {
	return (
		<div className="flex items-center gap-2 mb-6">
			<Package className="h-5 w-5" />
			<h1 className="text-2xl font-bold">Đơn hàng của bạn</h1>
		</div>
	);
}
