export interface Address {
	id: string;
	userId: string;
	fullName: string;
	phone: string;
	province: string;
	district: string;
	ward: string;
	addressDetail: string;
	isDefault: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CreateAddressRequest {
	fullName: string;
	phone: string;
	province: string;
	district: string;
	ward: string;
	addressDetail: string;
	isDefault?: boolean;
}

export interface UpdateAddressRequest extends CreateAddressRequest {
	id: string;
}

export interface AddressListResponse {
	addresses: Address[];
	total: number;
}
