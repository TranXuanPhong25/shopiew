export type NotificationType = "order" | "promotion" | "system";

export interface Notification {
	id: string;
	userID: string;
	title: string;
	message: string;
	type: NotificationType;
	isRead: boolean;
	createdAt: string;
}
