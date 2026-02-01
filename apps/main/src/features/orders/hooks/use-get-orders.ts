import { useQuery } from "@tanstack/react-query";
import OrderService from "../service";

interface UseGetOrdersParams {
	page?: number;
	size?: number;
}

export function useGetOrders(params?: UseGetOrdersParams) {
	const page = params?.page ?? 0;
	const size = params?.size ?? 10;

	return useQuery({
		queryKey: ["orders", page, size],
		queryFn: () => OrderService.getMyOrders(page, size),
	});
}
