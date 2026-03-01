"use client";

import { Bell, CheckCheck, Package, Megaphone, Info, Trash2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetNotifications } from "../hooks/use-get-notifications";
import { useGetUnreadCount } from "../hooks/use-get-unread-count";
import {
	useMarkAsRead,
	useMarkAllAsRead,
	useDeleteNotification,
} from "../hooks/use-notification-mutations";
import { Notification, NotificationType } from "../types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TYPE_ICON: Record<NotificationType, React.ReactNode> = {
	order: <Package className="h-4 w-4 text-blue-500" />,
	promotion: <Megaphone className="h-4 w-4 text-orange-500" />,
	system: <Info className="h-4 w-4 text-gray-500" />,
};

function NotificationItem({ notification }: { notification: Notification }) {
	const { mutate: markRead } = useMarkAsRead();
	const { mutate: remove } = useDeleteNotification();

	const timeAgo = (dateStr: string) => {
		const diff = Date.now() - new Date(dateStr).getTime();
		const mins = Math.floor(diff / 60000);
		if (mins < 1) return "Vừa xong";
		if (mins < 60) return `${mins} phút trước`;
		const hrs = Math.floor(mins / 60);
		if (hrs < 24) return `${hrs} giờ trước`;
		return `${Math.floor(hrs / 24)} ngày trước`;
	};

	return (
		<div
			className={cn(
				"flex items-start gap-3 px-3 py-2 hover:bg-muted/50 rounded-md cursor-pointer group",
				!notification.isRead && "bg-blue-50/60",
			)}
			onClick={() => !notification.isRead && markRead(notification.id)}
		>
			<div className="mt-0.5 shrink-0">{TYPE_ICON[notification.type]}</div>
			<div className="flex-1 min-w-0">
				<p
					className={cn(
						"text-sm truncate",
						!notification.isRead ? "font-semibold" : "font-normal",
					)}
				>
					{notification.title}
				</p>
				<p className="text-xs text-muted-foreground line-clamp-2">
					{notification.message}
				</p>
				<p className="text-[10px] text-muted-foreground mt-0.5">
					{timeAgo(notification.createdAt)}
				</p>
			</div>
			<button
				className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-1 hover:text-red-500"
				onClick={(e) => {
					e.stopPropagation();
					remove(notification.id);
				}}
				aria-label="Xóa thông báo"
			>
				<Trash2 className="h-3.5 w-3.5" />
			</button>
		</div>
	);
}

export function NotificationDropdown() {
	const { data: notifications = [] } = useGetNotifications();
	const { data: unreadData } = useGetUnreadCount();
	const { mutate: markAllRead } = useMarkAllAsRead();

	const unreadCount = unreadData?.unreadCount ?? 0;
	const recent = notifications.slice(0, 8);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="relative">
					<Button variant="ghost" className="p-3" aria-label="Thông báo">
						<Bell className="w-5 h-5" />
					</Button>
					{unreadCount > 0 && (
						<div className="absolute -top-1 -right-1 w-fit min-w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center px-1 pointer-events-none">
							{unreadCount > 99 ? "99+" : unreadCount}
						</div>
					)}
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-80 p-1">
				<div className="flex items-center justify-between px-2 py-1">
					<DropdownMenuLabel className="p-0 text-base">
						Thông báo
					</DropdownMenuLabel>
					{unreadCount > 0 && (
						<button
							onClick={() => markAllRead()}
							className="text-xs text-blue-600 hover:underline flex items-center gap-1"
						>
							<CheckCheck className="h-3.5 w-3.5" />
							Đọc tất cả
						</button>
					)}
				</div>
				<DropdownMenuSeparator />

				{recent.length === 0 ? (
					<div className="py-8 text-center text-sm text-muted-foreground">
						Không có thông báo nào
					</div>
				) : (
					<div className="flex flex-col gap-0.5 max-h-[360px] overflow-y-auto">
						{recent.map((n) => (
							<NotificationItem key={n.id} notification={n} />
						))}
					</div>
				)}

				{notifications.length > 0 && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className="justify-center text-blue-600">
							<Link href="/notifications">Xem tất cả thông báo</Link>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
