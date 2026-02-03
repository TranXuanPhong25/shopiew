import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OrderService from "../service";
import { CreateOrderRequest } from "../types";
import { useOrderStore } from "@/stores/order-store";

export function useCreateOrder() {
	const router = useRouter();
	const setPendingOrderId = useOrderStore((state) => state.setPendingOrderId);

	return useMutation({
		mutationFn: (request: CreateOrderRequest) =>
			OrderService.createOrder(request),
		onSuccess: (data) => {
			toast.success("Đặt hàng thành công!");
			// Set pending order ID before redirect so the order page knows this is a fresh redirect
			setPendingOrderId(String(data.order.id));
			// Redirect to order detail page
			router.push(`/orders/${data.order.id}`);
		},
		onError: (error: Error) => {
			toast.error(`Đặt hàng thất bại: ${error.message}`);
		},
	});
}
