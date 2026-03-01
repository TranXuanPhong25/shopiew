"use client";

import { Bell, CheckCheck, Package, Megaphone, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetNotifications } from "@/features/notifications/hooks/use-get-notifications";
import {
	useMarkAsRead,
	useMarkAllAsRead,
	useDeleteNotification,
} from "@/features/notifications/hooks/use-notification-mutations";
import { Notification, NotificationType } from "@/features/notifications/types";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
	order: <Package className="h-5 w-5 text-blue-500" />,
	promotion: <Megaphone className="h-5 w-5 text-orange-500" />,
	system: <Info className="h-5 w-5 text-gray-500" />,
};

const TYPE_LABEL: Record<NotificationType, string> = {
	order: "Đơn hàng",
	promotion: "Khuyến mãi",
	system: "Hệ thống",
};

function NotificationRow({ notification }: { notification: Notification }) {
	const { mutate: markRead, isPending: marking } = useMarkAsRead();
	const { mutate: remove, isPending: deleting } = useDeleteNotification();

	const timeAgo = (dateStr: string) => {
		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 1) return "Vừa xong";
		if (mins < 60) return `${mins} phút trước`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs} giờ trước`;
		return new Date(dateStr).toLocaleDateString("vi-VN");
	};

	return (
		<div
			className={cn(
				"flex items-start gap-4 p-4 rounded-lg border bg-white transition-colors",
				!notification.isRead && "border-blue-200 bg-blue-50/40",
			)}
		>
			<div className="mt-0.5 shrink-0">{TYPE_ICON[notification.type]}</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-0.5">
					<span className="text-xs text-muted-foreground">
						{TYPE_LABEL[notification.type]}
					</span>
					{!notification.isRead && (
						<span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
					)}
				</div>
				<p className={cn("text-sm", !notification.isRead && "font-semibold")}>
					{notification.title}
				</p>
				<p className="text-sm text-muted-foreground mt-0.5">
					{notification.message}
				</p>
				<p className="text-xs text-muted-foreground mt-1">
					{timeAgo(notification.createdAt)}
				</p>
			</div>
			<div className="flex items-center gap-1 shrink-0">
				{!notification.isRead && (
					<Button
						variant="ghost"
						size="sm"
						disabled={marking}
						onClick={() => markRead(notification.id)}
						className="text-xs h-7 px-2"
					>
						Đánh dấu đã đọc
					</Button>
				)}
				<Button
					variant="ghost"
					size="icon"
					className="h-7 w-7 text-muted-foreground hover:text-red-500"
					disabled={deleting}
					onClick={() => remove(notification.id)}
					aria-label="Xóa"
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}

export default function NotificationsPage() {
	const { data: notifications = [], isLoading } = useGetNotifications();
	const { mutate: markAllRead, isPending } = useMarkAllAsRead();

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	return (
		<div className="max-w-2xl mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-2">
					<Bell className="h-5 w-5" />
					<h1 className="text-xl font-semibold">Thông báo của tôi</h1>
					{unreadCount > 0 && (
						<span className="text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">
							{unreadCount} chưa đọc
						</span>
					)}
				</div>
				{unreadCount > 0 && (
					<Button
						variant="outline"
						size="sm"
						disabled={isPending}
						onClick={() => markAllRead()}
						className="gap-1.5"
					>
						<CheckCheck className="h-4 w-4" />
						Đọc tất cả
					</Button>
				)}
			</div>

			{isLoading ? (
				<div className="flex flex-col gap-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
					))}
				</div>
			) : notifications.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
					<Bell className="h-10 w-10 opacity-30" />
					<p>Bạn chưa có thông báo nào</p>
				</div>
			) : (
				<div className="flex flex-col gap-3">
					{notifications.map((n) => (
						<NotificationRow key={n.id} notification={n} />
					))}
				</div>
			)}
		</div>
	);
}
