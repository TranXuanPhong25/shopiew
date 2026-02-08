"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, User, Edit, Trash2, CheckCircle2 } from "lucide-react";
import type { Address } from "../types/address.types";

interface AddressCardProps {
	address: Address;
	onEdit: (address: Address) => void;
	onDelete: (address: Address) => void;
	onSetDefault: (addressId: string) => void;
}

export function AddressCard({
	address,
	onEdit,
	onDelete,
	onSetDefault,
}: AddressCardProps) {
	const fullAddress = `${address.addressDetail}, ${address.ward}, ${address.district}, ${address.province}`;

	return (
		<Card 
			className={`transition-all hover:shadow-md ${
				address.isDefault 
					? "border-blue-500 border-2 bg-blue-50/50" 
					: "hover:border-gray-300"
			}`}
			role="article"
			aria-label={`Địa chỉ của ${address.fullName}`}
		>
			<CardContent className="p-5 space-y-4">
				<div className="flex items-start justify-between gap-4">
					<div className="space-y-3 flex-1 min-w-0">
						{/* Name and Default Badge */}
						<div className="flex items-center gap-2 flex-wrap">
							<div className="flex items-center gap-2 min-w-0">
								<User className="h-4 w-4 text-gray-500 flex-shrink-0" aria-hidden="true" />
								<span className="font-semibold text-gray-900 truncate">
									{address.fullName}
								</span>
							</div>
							{address.isDefault && (
								<Badge 
									variant="default" 
									className="bg-blue-500 hover:bg-blue-600"
									aria-label="Địa chỉ mặc định"
								>
									<CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
									Mặc định
								</Badge>
							)}
						</div>

						{/* Phone */}
						<div className="flex items-center gap-2 text-sm text-gray-700">
							<Phone className="h-4 w-4 text-gray-400 flex-shrink-0" aria-hidden="true" />
							<a 
								href={`tel:${address.phone}`}
								className="hover:text-blue-600 transition-colors"
								aria-label={`Gọi điện tới ${address.phone}`}
							>
								{address.phone}
							</a>
						</div>

						{/* Address */}
						<div className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
							<MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
							<span className="flex-1">{fullAddress}</span>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex gap-2 pt-3 border-t border-gray-100">
					<Button
						variant="outline"
						size="default"
						onClick={() => onEdit(address)}
						className="flex-1 min-h-[44px] hover:bg-gray-50 transition-colors"
						aria-label={`Chỉnh sửa địa chỉ ${address.fullName}`}
					>
						<Edit className="h-4 w-4 mr-2" aria-hidden="true" />
						<span>Chỉnh sửa</span>
					</Button>
					{!address.isDefault && (
						<Button
							variant="outline"
							size="default"
							onClick={() => onSetDefault(address.id)}
							className="flex-1 min-h-[44px] hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
							aria-label={`Đặt ${address.fullName} làm địa chỉ mặc định`}
						>
							<CheckCircle2 className="h-4 w-4 mr-2" aria-hidden="true" />
							<span>Đặt mặc định</span>
						</Button>
					)}
					<Button
						variant="outline"
						size="default"
						onClick={() => onDelete(address)}
						className="min-h-[44px] min-w-[44px] hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
						aria-label={`Xóa địa chỉ ${address.fullName}`}
					>
						<Trash2 className="h-4 w-4" aria-hidden="true" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
