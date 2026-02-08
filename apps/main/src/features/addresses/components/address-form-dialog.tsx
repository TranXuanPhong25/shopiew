"use client";

import { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import type { Address, CreateAddressRequest } from "../types/address.types";

interface AddressFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: CreateAddressRequest) => void;
	editAddress?: Address | null;
	isLoading?: boolean;
}

interface FormErrors {
	fullName?: string;
	phone?: string;
	province?: string;
	district?: string;
	ward?: string;
	addressDetail?: string;
}

export function AddressFormDialog({
	open,
	onOpenChange,
	onSubmit,
	editAddress,
	isLoading = false,
}: AddressFormDialogProps) {
	const [formData, setFormData] = useState<CreateAddressRequest>({
		fullName: "",
		phone: "",
		province: "",
		district: "",
		ward: "",
		addressDetail: "",
		isDefault: false,
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});

	useEffect(() => {
		// Only reset form when dialog opens or editAddress changes
		if (open) {
			if (editAddress) {
				setFormData({
					fullName: editAddress.fullName,
					phone: editAddress.phone,
					province: editAddress.province,
					district: editAddress.district,
					ward: editAddress.ward,
					addressDetail: editAddress.addressDetail,
					isDefault: editAddress.isDefault,
				});
			} else {
				setFormData({
					fullName: "",
					phone: "",
					province: "",
					district: "",
					ward: "",
					addressDetail: "",
					isDefault: false,
				});
			}
			setErrors({});
			setTouched({});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open]); // Only depend on open state, not editAddress

	const validateField = (name: keyof CreateAddressRequest, value: string): string | undefined => {
		switch (name) {
			case "fullName":
				if (!value.trim()) return "Vui lòng nhập họ tên";
				if (value.trim().length < 2) return "Họ tên phải có ít nhất 2 ký tự";
				break;
			case "phone":
				if (!value.trim()) return "Vui lòng nhập số điện thoại";
				if (!/^[0-9]{10,11}$/.test(value.replace(/\s/g, ""))) {
					return "Số điện thoại không hợp lệ (10-11 chữ số)";
				}
				break;
			case "province":
			case "district":
			case "ward":
				if (!value.trim()) return "Trường này là bắt buộc";
				break;
			case "addressDetail":
				if (!value.trim()) return "Vui lòng nhập địa chỉ cụ thể";
				if (value.trim().length < 5) return "Địa chỉ quá ngắn";
				break;
		}
		return undefined;
	};

	const handleBlur = (field: keyof CreateAddressRequest) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
		const error = validateField(field, formData[field] as string);
		setErrors((prev) => ({ ...prev, [field]: error }));
	};

	const handleChange = (field: keyof CreateAddressRequest, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		
		// Clear error when user starts typing
		if (typeof value === "string" && touched[field]) {
			const error = validateField(field, value);
			setErrors((prev) => ({ ...prev, [field]: error }));
		}
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};
		let isValid = true;

		(Object.keys(formData) as Array<keyof CreateAddressRequest>).forEach((key) => {
			if (key !== "isDefault") {
				const error = validateField(key, formData[key] as string);
				if (error) {
					newErrors[key as keyof FormErrors] = error;
					isValid = false;
				}
			}
		});

		setErrors(newErrors);
		setTouched({
			fullName: true,
			phone: true,
			province: true,
			district: true,
			ward: true,
			addressDetail: true,
		});

		return isValid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	const FormField = ({
		id,
		label,
		value,
		error,
		placeholder,
		required = true,
		type = "text",
		autoComplete,
	}: {
		id: keyof CreateAddressRequest;
		label: string;
		value: string;
		error?: string;
		placeholder: string;
		required?: boolean;
		type?: string;
		autoComplete?: string;
	}) => (
		<div className="space-y-2">
			<Label htmlFor={id} className="text-sm font-medium">
				{label}
				{required && <span className="text-red-500 ml-1" aria-label="bắt buộc">*</span>}
			</Label>
			<Input
				id={id}
				type={type}
				value={value}
				onChange={(e) => handleChange(id, e.target.value)}
				onBlur={() => handleBlur(id)}
				placeholder={placeholder}
				required={required}
				autoComplete={autoComplete}
				aria-invalid={error ? "true" : "false"}
				aria-describedby={error ? `${id}-error` : undefined}
				className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
			/>
			{error && (
				<p 
					id={`${id}-error`} 
					className="text-sm text-red-600 flex items-center gap-1"
					role="alert"
				>
					<AlertCircle className="h-3 w-3" aria-hidden="true" />
					{error}
				</p>
			)}
		</div>
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange} modal={true}>
			<DialogContent 
				className="max-w-2xl max-h-[90vh] overflow-y-auto"
				aria-labelledby="dialog-title"
				aria-describedby="dialog-description"
			>
				<DialogHeader>
					<DialogTitle id="dialog-title">
						{editAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
					</DialogTitle>
					<DialogDescription id="dialog-description">
						{editAddress 
							? "Cập nhật thông tin địa chỉ giao hàng của bạn"
							: "Điền đầy đủ thông tin để thêm địa chỉ giao hàng mới"
						}
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4" noValidate>
					{/* Contact Information */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<FormField
							id="fullName"
							label="Họ và tên"
							value={formData.fullName}
							error={errors.fullName}
							placeholder="Nguyễn Văn A"
							autoComplete="name"
						/>

						<FormField
							id="phone"
							label="Số điện thoại"
							value={formData.phone}
							error={errors.phone}
							placeholder="0912345678"
							type="tel"
							autoComplete="tel"
						/>
					</div>

					{/* Location Information */}
					<div className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
							<FormField
								id="province"
								label="Tỉnh/Thành phố"
								value={formData.province}
								error={errors.province}
								placeholder="Hà Nội"
								autoComplete="address-level1"
							/>

							<FormField
								id="district"
								label="Quận/Huyện"
								value={formData.district}
								error={errors.district}
								placeholder="Ba Đình"
								autoComplete="address-level2"
							/>

							<FormField
								id="ward"
								label="Phường/Xã"
								value={formData.ward}
								error={errors.ward}
								placeholder="Phường Điện Biên"
								autoComplete="address-level3"
							/>
						</div>

						<FormField
							id="addressDetail"
							label="Địa chỉ cụ thể"
							value={formData.addressDetail}
							error={errors.addressDetail}
							placeholder="Số nhà, tên đường..."
							autoComplete="street-address"
						/>
					</div>

					{/* Default Address Checkbox */}
					<div className="flex items-center space-x-2 py-2">
						<Checkbox
							id="isDefault"
							checked={formData.isDefault}
							onCheckedChange={(checked) =>
								handleChange("isDefault", checked === true)
							}
							aria-label="Đặt làm địa chỉ mặc định"
						/>
						<Label 
							htmlFor="isDefault" 
							className="text-sm font-normal cursor-pointer"
						>
							Đặt làm địa chỉ mặc định
						</Label>
					</div>

					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isLoading}
							className="min-h-[44px]"
						>
							Hủy
						</Button>
						<Button 
							type="submit" 
							disabled={isLoading}
							className="min-h-[44px]"
						>
							{isLoading ? (
								<>
									<span className="animate-spin mr-2">⏳</span>
									Đang xử lý...
								</>
							) : (
								editAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
