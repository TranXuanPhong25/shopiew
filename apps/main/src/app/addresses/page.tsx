"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ChevronLeft, MapPinned, PackageSearch } from "lucide-react";
import { useAuth } from "@/features/auth";
import {
	useAddresses,
	useCreateAddress,
	useUpdateAddress,
	useDeleteAddress,
	useSetDefaultAddress,
	AddressCard,
	AddressFormDialog,
	DeleteConfirmationDialog,
	type Address,
	type CreateAddressRequest,
	type UpdateAddressRequest,
} from "@/features/addresses";

export default function AddressesPage() {
	const { user } = useAuth();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);

	const { data, isLoading, error } = useAddresses(user?.id);
	const createMutation = useCreateAddress(user?.id || "");
	const updateMutation = useUpdateAddress(user?.id || "");
	const deleteMutation = useDeleteAddress(user?.id || "");
	const setDefaultMutation = useSetDefaultAddress(user?.id || "");

	const handleAddNew = () => {
		setEditingAddress(null);
		setDialogOpen(true);
	};

	const handleEdit = (address: Address) => {
		setEditingAddress(address);
		setDialogOpen(true);
	};

	const handleSubmit = async (formData: CreateAddressRequest) => {
		try {
			if (editingAddress) {
				const updateData: UpdateAddressRequest = {
					...formData,
					id: editingAddress.id,
				};
				await updateMutation.mutateAsync(updateData);
			} else {
				await createMutation.mutateAsync(formData);
			}
			setDialogOpen(false);
			setEditingAddress(null);
		} catch (error) {
			// Error handled by mutation
		}
	};

	const handleDeleteClick = (address: Address) => {
		setDeletingAddress(address);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!deletingAddress) return;

		try {
			await deleteMutation.mutateAsync(deletingAddress.id);
			setDeleteDialogOpen(false);
			setDeletingAddress(null);
		} catch (error) {
			// Error handled by mutation
		}
	};

	const handleSetDefault = async (addressId: string) => {
		await setDefaultMutation.mutateAsync(addressId);
	};

	// Not logged in state
	if (!user) {
		return (
			<div className="max-w-4xl mx-auto px-4 py-8">
				<Card className="border-0 shadow-lg">
					<CardContent className="text-center py-16">
						<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
							<MapPinned
								className="h-10 w-10 text-blue-600"
								aria-hidden="true"
							/>
						</div>
						<h2 className="text-2xl font-bold mb-3 text-gray-900">
							Vui lòng đăng nhập
						</h2>
						<p className="text-gray-600 mb-6 max-w-md mx-auto">
							Bạn cần đăng nhập để quản lý địa chỉ giao hàng và tiện lợi
							hơn khi đặt hàng
						</p>
						<Button asChild size="lg" className="min-h-[44px]">
							<Link href="/">Về trang chủ</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
			{/* Header with Breadcrumb */}
			<nav aria-label="Breadcrumb" className="mb-4">
				<Link
					href="/"
					className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
				>
					<ChevronLeft className="h-4 w-4 mr-1" aria-hidden="true" />
					<span>Quay lại</span>
				</Link>
			</nav>

			<div className="mb-6 sm:mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
							Địa chỉ của tôi
						</h1>
						<p className="text-gray-600 mt-1.5 text-sm sm:text-base">
							Quản lý địa chỉ giao hàng để đặt hàng nhanh hơn
						</p>
					</div>
					<Button
						onClick={handleAddNew}
						size="lg"
						className="min-h-[44px] w-full sm:w-auto"
						aria-label="Thêm địa chỉ mới"
					>
						<Plus className="h-4 w-4 mr-2" aria-hidden="true" />
						<span>Thêm địa chỉ mới</span>
					</Button>
				</div>
			</div>

			{/* Loading State with Skeleton */}
			{isLoading && (
				<div
					className="space-y-4"
					role="status"
					aria-label="Đang tải địa chỉ"
				>
					{[1, 2, 3].map((i) => (
						<Card key={i} className="animate-pulse">
							<CardContent className="p-5 space-y-4">
								<div className="flex items-start justify-between gap-4">
									<div className="space-y-3 flex-1">
										<div className="flex items-center gap-2">
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-5 w-40" />
										</div>
										<div className="flex items-center gap-2">
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-4 w-32" />
										</div>
										<div className="flex items-start gap-2">
											<Skeleton className="h-4 w-4 rounded-full" />
											<Skeleton className="h-4 w-full max-w-md" />
										</div>
									</div>
								</div>
								<div className="flex gap-2 pt-3 border-t">
									<Skeleton className="h-11 flex-1" />
									<Skeleton className="h-11 flex-1" />
									<Skeleton className="h-11 w-11" />
								</div>
							</CardContent>
						</Card>
					))}
					<span className="sr-only">Đang tải danh sách địa chỉ...</span>
				</div>
			)}

			{/* Error State */}
			{error && !isLoading && (
				<Card className="border-red-200 bg-red-50">
					<CardContent className="text-center py-12">
						<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
							<PackageSearch
								className="h-8 w-8 text-red-600"
								aria-hidden="true"
							/>
						</div>
						<h2 className="text-xl font-semibold mb-2 text-gray-900">
							Không thể tải địa chỉ
						</h2>
						<p className="text-gray-600 mb-4">
							Đã xảy ra lỗi khi tải danh sách địa chỉ. Vui lòng thử lại.
						</p>
						<Button
							onClick={() => window.location.reload()}
							variant="outline"
							className="min-h-[44px]"
						>
							Tải lại trang
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Empty State - Engaging design */}
			{!isLoading && !error && data?.addresses.length === 0 && (
				<Card className="border-dashed border-2 border-gray-300 bg-gray-50/50">
					<CardContent className="text-center py-16">
						<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
							<MapPinned
								className="h-10 w-10 text-blue-600"
								aria-hidden="true"
							/>
						</div>
						<h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">
							Chưa có địa chỉ giao hàng
						</h2>
						<p className="text-gray-600 mb-2 max-w-md mx-auto">
							Thêm địa chỉ giao hàng để việc đặt hàng trở nên nhanh chóng
							và thuận tiện hơn
						</p>
						<p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
							💡 Địa chỉ của bạn sẽ được lưu trữ an toàn và chỉ dùng cho
							việc giao hàng
						</p>
						<Button
							onClick={handleAddNew}
							size="lg"
							className="min-h-[44px]"
						>
							<Plus className="h-4 w-4 mr-2" aria-hidden="true" />
							<span>Thêm địa chỉ đầu tiên</span>
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Address List */}
			{!isLoading && !error && data && data.addresses.length > 0 && (
				<div
					className="space-y-4"
					role="list"
					aria-label={`Danh sách ${data.total} địa chỉ`}
				>
					{data.addresses.map((address) => (
						<AddressCard
							key={address.id}
							address={address}
							onEdit={handleEdit}
							onDelete={handleDeleteClick}
							onSetDefault={handleSetDefault}
						/>
					))}
				</div>
			)}

			{/* Address Form Dialog */}
			<AddressFormDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSubmit={handleSubmit}
				editAddress={editingAddress}
				isLoading={createMutation.isPending || updateMutation.isPending}
			/>

			{/* Delete Confirmation Dialog */}
			<DeleteConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				addressName={deletingAddress?.fullName || ""}
				isLoading={deleteMutation.isPending}
			/>
		</div>
	);
}
