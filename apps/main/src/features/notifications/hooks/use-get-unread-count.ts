import { useQuery } from "@tanstack/react-query";
import NotificationService from "../service";
import { useAuth } from "@/features/auth";

export function useGetUnreadCount() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["notifications", "unread-count"],
		queryFn: () => NotificationService.getUnreadCount(),
		enabled: !!user,
		refetchOnWindowFocus: true,
		refetchInterval: 60_000, // poll every minute
		retry: 1,
	});
}
