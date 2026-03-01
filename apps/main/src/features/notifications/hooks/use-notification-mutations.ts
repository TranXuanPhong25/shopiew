import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationService from "../service";

export function useMarkAsRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => NotificationService.markAsRead(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
	});
}

export function useMarkAllAsRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => NotificationService.markAllAsRead(),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
	});
}

export function useDeleteNotification() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => NotificationService.deleteNotification(id),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
	});
}
