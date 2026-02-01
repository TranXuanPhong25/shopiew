import { ChevronLeft, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface OrdersSearchBarProps {
	onBack?: () => void;
}

export function OrdersSearchBar({ onBack }: OrdersSearchBarProps) {
	return (
		<div className=" z-10 bg-white border-b rounded-t-xl">
			<div className="flex items-center gap-3 px-4 py-3">
				{onBack && (
					<button
						onClick={onBack}
						className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full"
						aria-label="Quay lại"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
				)}
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<Input
						type="search"
						placeholder="Tìm kiếm đơn hàng của bạn"
						className="pl-10 pr-4 bg-gray-100 border-0 rounded-lg h-11"
					/>
				</div>
			</div>
		</div>
	);
}
