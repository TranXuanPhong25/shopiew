"use client";

import { useAuth } from "@/features/auth";
import { NotificationDropdown } from "@/features/notifications/components/notification-dropdown";

const NotificationIndicator = () => {
	const { user } = useAuth();
	if (!user) return null;
	return <NotificationDropdown />;
};

export default NotificationIndicator;
