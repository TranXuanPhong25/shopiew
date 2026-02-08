import { useQuery } from "@tanstack/react-query";
import OrderService from "../service";
import { OrderStatus } from "../types";

// Statuses that should continue polling

export function useGetOrder(orderId: string | undefined) {
	return useQuery({
		queryKey: ["order", orderId],
		queryFn: () => OrderService.getOrder(orderId!),
		enabled: !!orderId,
		// Poll every 3 seconds while order is in pending status
		refetchInterval: (query) => {
			const status: OrderStatus | undefined = query.state.data?.status;
			if (!status) {
				return 3000; // Poll every 3 seconds
			}
			return false; // Stop polling when order is no longer pending
		},
		refetchIntervalInBackground: false, // Don't poll when tab is not focused
	});
}
