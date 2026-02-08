import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AddressService } from "../services/address.service";
import type {
	CreateAddressRequest,
	UpdateAddressRequest,
	Address,
} from "../types/address.types";
import { toast } from "sonner";

export const useAddresses = (userId?: string) => {
	return useQuery({
		queryKey: ["addresses", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID is required");
			return await AddressService.getAddresses(userId);
		},
		enabled: !!userId,
		staleTime: 30000, // 30 seconds
	});
};

export const useCreateAddress = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: CreateAddressRequest) =>
			AddressService.createAddress(request, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			toast.success("Đã thêm địa chỉ mới");
		},
		onError: (error) => {
			toast.error(
				`Không thể thêm địa chỉ: ${error instanceof Error ? error.message : "Lỗi không xác định"}`,
			);
		},
	});
};

export const useUpdateAddress = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (request: UpdateAddressRequest) =>
			AddressService.updateAddress(request, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			toast.success("Đã cập nhật địa chỉ");
		},
		onError: (error) => {
			toast.error(
				`Không thể cập nhật địa chỉ: ${error instanceof Error ? error.message : "Lỗi không xác định"}`,
			);
		},
	});
};

export const useDeleteAddress = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (addressId: string) =>
			AddressService.deleteAddress(addressId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			toast.success("Đã xóa địa chỉ");
		},
		onError: (error) => {
			toast.error(
				`Không thể xóa địa chỉ: ${error instanceof Error ? error.message : "Lỗi không xác định"}`,
			);
		},
	});
};

export const useSetDefaultAddress = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (addressId: string) =>
			AddressService.setDefaultAddress(addressId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses", userId] });
			toast.success("Đã đặt làm địa chỉ mặc định");
		},
		onError: (error) => {
			toast.error(
				`Không thể đặt địa chỉ mặc định: ${error instanceof Error ? error.message : "Lỗi không xác định"}`,
			);
		},
	});
};
