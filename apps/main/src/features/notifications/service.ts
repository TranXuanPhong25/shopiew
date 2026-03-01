import axiosClient from "@/utils/axiosClient";
import { Notification } from "./types";

class NotificationService {
	async getMyNotifications(): Promise<Notification[]> {
		const response = await axiosClient.get<Notification[]>(
			`/notifications/mine`,
		);
		return response.data;
	}

	async getUnreadCount(): Promise<{ unreadCount: number }> {
		const response = await axiosClient.get<{ unreadCount: number }>(
			`/notifications/mine/unread-count`,
		);
		return response.data;
	}

	async markAsRead(id: string): Promise<void> {
		await axiosClient.put(`/notifications/mine/${id}/read`);
	}

	async markAllAsRead(): Promise<void> {
		await axiosClient.put(`/notifications/mine/read-all`);
	}

	async deleteNotification(id: string): Promise<void> {
		await axiosClient.delete(`/notifications/mine/${id}`);
	}
}

export default new NotificationService();
