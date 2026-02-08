"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, LogOut, ShoppingBag, ShoppingCart, User, MapPin } from "lucide-react";
import Modal from "../ui/modal";
import { AuthForms } from "@/features/auth/components/auth-forms";
import { useAuth } from "@/features/auth";

const AccountButton = () => {
	const [open, setOpen] = useState(false);
	const { user, logout, loading } = useAuth();

	const displayName = useMemo(() => {
		if (!user) return "";
		if (user.username && user.username.trim().length > 0)
			return user.username;
		if (user.email) return user.email.split("@")[0];
		return "Người dùng";
	}, [user]);

	const initials = useMemo(() => {
		if (!displayName) return "?";
		return displayName.charAt(0).toUpperCase();
	}, [displayName]);
	if (!user) {
		return (
			<>
				<Button
					variant="ghost"
					className={open ? "bg-gray-100" : ""}
					onClick={() => !loading && setOpen(true)}
				>
					<User className="w-5 h-5 mr-2 sm:mr-2" />
					<span className="hidden sm:inline">Tài khoản</span>
				</Button>

				{open && (
					<Modal setOpen={setOpen}>
						<AuthForms setOpen={setOpen} />
					</Modal>
				)}
			</>
		);
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="gap-2 px-2 sm:px-3">
					<Avatar className="h-9 w-9">
						{user?.avatar ? (
							<AvatarImage src={user.avatar} alt={displayName} />
						) : (
							<AvatarFallback>{initials}</AvatarFallback>
						)}
					</Avatar>
					<span className="hidden sm:flex flex-col items-start">
						<span className="text-sm font-medium leading-tight max-w-[150px] truncate">
							{displayName}
						</span>
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="truncate">
					Xin chào, {displayName}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link
						href="/notifications"
						className="flex items-center gap-2 w-full"
					>
						<Bell className="h-4 w-4" />
						<span>Thông báo của tôi</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/orders" className="flex items-center gap-2 w-full">
						<ShoppingBag className="h-4 w-4" />
						<span>Đơn hàng của tôi</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href="/addresses" className="flex items-center gap-2 w-full">
						<MapPin className="h-4 w-4" />
						<span>Địa chỉ giao hàng</span>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onSelect={(event) => {
						event.preventDefault();
						void logout();
					}}
					className="text-red-600 focus:text-red-600"
				>
					<LogOut className="h-4 w-4" />
					<span>Đăng xuất</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default AccountButton;
