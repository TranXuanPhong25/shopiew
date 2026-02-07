"use client";

import { useState } from "react";
import { SavedAddress } from "../types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
	MapPin, 
	Home, 
	Briefcase, 
	Plus, 
	Check,
	X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressSelectorProps {
	selectedAddressId?: string;
	onAddressSelect: (address: SavedAddress | null) => void;
	onAddAddress?: (address: Omit<SavedAddress, 'id'>) => void;
}

export function AddressSelector({ 
	selectedAddressId,
	onAddressSelect,
	onAddAddress 
}: AddressSelectorProps) {
	const [isAddingNew, setIsAddingNew] = useState(false);
	const [newAddress, setNewAddress] = useState({
		recipientName: "",
		recipientPhone: "",
		address: "",
		label: "Home",
		isDefault: false,
	});

	// Mock saved addresses - in real app, fetch from API
	const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([
		{
			id: "1",
			recipientName: "Nguyễn Văn A",
			recipientPhone: "0901234567",
			address: "123 Lê Lợi, Quận 1, TP.HCM",
			label: "Home",
			isDefault: true,
		},
		{
			id: "2",
			recipientName: "Nguyễn Văn A",
			recipientPhone: "0901234567",
			address: "456 Nguyễn Huệ, Quận 3, TP.HCM",
			label: "Office",
			isDefault: false,
		},
	]);

	const handleSaveNewAddress = () => {
		if (!newAddress.recipientName || !newAddress.recipientPhone || !newAddress.address) {
			alert("Vui lòng điền đầy đủ thông tin");
			return;
		}

		const address: SavedAddress = {
			...newAddress,
			id: Date.now().toString(),
		};

		setSavedAddresses([...savedAddresses, address]);
		onAddressSelect(address);
		setIsAddingNew(false);
		setNewAddress({
			recipientName: "",
			recipientPhone: "",
			address: "",
			label: "Home",
			isDefault: false,
		});

		if (onAddAddress) {
			onAddAddress(newAddress);
		}
	};

	const getIcon = (label?: string) => {
		switch (label) {
			case "Home":
				return <Home className="w-4 h-4" />;
			case "Office":
				return <Briefcase className="w-4 h-4" />;
			default:
				return <MapPin className="w-4 h-4" />;
		}
	};

	return (
		<Card className="p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold flex items-center gap-2">
					<MapPin className="w-5 h-5 text-brand-500" />
					Địa chỉ giao hàng
				</h2>
				{!isAddingNew && (
					<Button
						variant="outline"
						size="sm"
						onClick={() => setIsAddingNew(true)}
						className="gap-2"
					>
						<Plus className="w-4 h-4" />
						Thêm địa chỉ mới
					</Button>
				)}
			</div>

			{isAddingNew ? (
				<div className="space-y-4 p-4 bg-slate-50 rounded-xl">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">Thêm địa chỉ mới</h3>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsAddingNew(false)}
						>
							<X className="w-4 h-4" />
						</Button>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label htmlFor="new-name">Họ và tên <span className="text-red-500">*</span></Label>
							<Input
								id="new-name"
								value={newAddress.recipientName}
								onChange={(e) => setNewAddress({ ...newAddress, recipientName: e.target.value })}
								placeholder="Nhập họ và tên"
							/>
						</div>
						<div>
							<Label htmlFor="new-phone">Số điện thoại <span className="text-red-500">*</span></Label>
							<Input
								id="new-phone"
								value={newAddress.recipientPhone}
								onChange={(e) => setNewAddress({ ...newAddress, recipientPhone: e.target.value })}
								placeholder="Nhập số điện thoại"
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="new-address">Địa chỉ chi tiết <span className="text-red-500">*</span></Label>
						<Textarea
							id="new-address"
							value={newAddress.address}
							onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
							placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
							rows={3}
						/>
					</div>

					<div>
						<Label>Loại địa chỉ</Label>
						<RadioGroup
							value={newAddress.label}
							onValueChange={(value) => setNewAddress({ ...newAddress, label: value })}
							className="flex gap-4 mt-2"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Home" id="home" />
								<Label htmlFor="home" className="cursor-pointer flex items-center gap-1">
									<Home className="w-4 h-4" />
									Nhà riêng
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="Office" id="office" />
								<Label htmlFor="office" className="cursor-pointer flex items-center gap-1">
									<Briefcase className="w-4 h-4" />
									Văn phòng
								</Label>
							</div>
						</RadioGroup>
					</div>

					<div className="flex gap-2">
						<Button onClick={handleSaveNewAddress} className="flex-1">
							Lưu địa chỉ
						</Button>
						<Button variant="outline" onClick={() => setIsAddingNew(false)}>
							Hủy
						</Button>
					</div>
				</div>
			) : (
				<div className="space-y-3">
					{savedAddresses.map((address) => (
						<div
							key={address.id}
							onClick={() => onAddressSelect(address)}
							className={cn(
								"p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-brand-300 hover:bg-brand-50/30",
								selectedAddressId === address.id
									? "border-brand-500 bg-brand-50"
									: "border-gray-200"
							)}
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-brand-100 text-brand-700">
											{getIcon(address.label)}
											{address.label}
										</span>
										{address.isDefault && (
											<span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
												Mặc định
											</span>
										)}
									</div>
									<div className="space-y-1">
										<p className="font-medium text-gray-900">
											{address.recipientName} | {address.recipientPhone}
										</p>
										<p className="text-sm text-gray-600">{address.address}</p>
									</div>
								</div>
								{selectedAddressId === address.id && (
									<div className="ml-4 flex-shrink-0">
										<div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
											<Check className="w-4 h-4 text-white" />
										</div>
									</div>
								)}
							</div>
						</div>
					))}

					{savedAddresses.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<MapPin className="w-12 h-12 mx-auto mb-2 text-gray-300" />
							<p>Chưa có địa chỉ nào được lưu</p>
							<Button
								variant="link"
								onClick={() => setIsAddingNew(true)}
								className="mt-2"
							>
								Thêm địa chỉ đầu tiên
							</Button>
						</div>
					)}
				</div>
			)}
		</Card>
	);
}
