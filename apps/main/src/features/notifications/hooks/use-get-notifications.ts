import { useQuery } from "@tanstack/react-query";
import NotificationService from "../service";
import { useAuth } from "@/features/auth";

export function useGetNotifications() {
	const { user } = useAuth();
	return useQuery({
		queryKey: ["notifications", "mine"],
		queryFn: () => NotificationService.getMyNotifications(),
		enabled: !!user,
		refetchOnWindowFocus: true,
		retry: 1,
	});
}
