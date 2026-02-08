import type {
	Address,
	CreateAddressRequest,
	UpdateAddressRequest,
	AddressListResponse,
} from "../types/address.types";

// Mock data for development - replace with actual API calls later
const mockAddresses: Address[] = [];

let nextId = 1;

export class AddressService {
	private static readonly STORAGE_KEY = "user_addresses";

	// Load from localStorage
	private static loadFromStorage(): Address[] {
		if (typeof window === "undefined") return mockAddresses;
		try {
			const stored = localStorage.getItem(this.STORAGE_KEY);
			return stored ? JSON.parse(stored) : mockAddresses;
		} catch (error) {
			console.error("Error loading addresses from storage:", error);
			return mockAddresses;
		}
	}

	// Save to localStorage
	private static saveToStorage(addresses: Address[]): void {
		if (typeof window !== "undefined") {
			try {
				localStorage.setItem(this.STORAGE_KEY, JSON.stringify(addresses));
			} catch (error) {
				console.error("Error saving addresses to storage:", error);
			}
		}
	}

	static async getAddresses(userId: string): Promise<AddressListResponse> {
		await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

		const addresses = this.loadFromStorage().filter(
			(addr) => addr.userId === userId,
		);

		return {
			addresses,
			total: addresses.length,
		};
	}

	static async getAddressById(
		addressId: string,
		userId: string,
	): Promise<Address> {
		await new Promise((resolve) => setTimeout(resolve, 300));

		const addresses = this.loadFromStorage();
		const address = addresses.find(
			(addr) => addr.id === addressId && addr.userId === userId,
		);

		if (!address) {
			throw new Error("Address not found");
		}

		return address;
	}

	static async createAddress(
		request: CreateAddressRequest,
		userId: string,
	): Promise<Address> {
		await new Promise((resolve) => setTimeout(resolve, 500));

		const addresses = this.loadFromStorage();

		// If this is set as default, unset others
		if (request.isDefault) {
			addresses.forEach((addr) => {
				if (addr.userId === userId) {
					addr.isDefault = false;
				}
			});
		}

		const newAddress: Address = {
			id: `addr_${nextId++}_${Date.now()}`,
			userId,
			...request,
			isDefault: request.isDefault ?? addresses.length === 0, // First address is default
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		addresses.push(newAddress);
		this.saveToStorage(addresses);

		return newAddress;
	}

	static async updateAddress(
		request: UpdateAddressRequest,
		userId: string,
	): Promise<Address> {
		await new Promise((resolve) => setTimeout(resolve, 500));

		const addresses = this.loadFromStorage();
		const index = addresses.findIndex(
			(addr) => addr.id === request.id && addr.userId === userId,
		);

		if (index === -1) {
			throw new Error("Address not found");
		}

		// If setting as default, unset others
		if (request.isDefault) {
			addresses.forEach((addr) => {
				if (addr.userId === userId && addr.id !== request.id) {
					addr.isDefault = false;
				}
			});
		}

		const updatedAddress: Address = {
			...addresses[index],
			...request,
			updatedAt: new Date().toISOString(),
		};

		addresses[index] = updatedAddress;
		this.saveToStorage(addresses);

		return updatedAddress;
	}

	static async deleteAddress(
		addressId: string,
		userId: string,
	): Promise<void> {
		await new Promise((resolve) => setTimeout(resolve, 500));

		let addresses = this.loadFromStorage();
		const index = addresses.findIndex(
			(addr) => addr.id === addressId && addr.userId === userId,
		);

		if (index === -1) {
			throw new Error("Address not found");
		}

		const wasDefault = addresses[index].isDefault;
		addresses = addresses.filter(
			(addr) => !(addr.id === addressId && addr.userId === userId),
		);

		// If deleted address was default, set first remaining as default
		if (wasDefault && addresses.length > 0) {
			const firstUserAddress = addresses.find(
				(addr) => addr.userId === userId,
			);
			if (firstUserAddress) {
				firstUserAddress.isDefault = true;
			}
		}

		this.saveToStorage(addresses);
	}

	static async setDefaultAddress(
		addressId: string,
		userId: string,
	): Promise<Address> {
		await new Promise((resolve) => setTimeout(resolve, 300));

		const addresses = this.loadFromStorage();

		// Unset all defaults for this user
		addresses.forEach((addr) => {
			if (addr.userId === userId) {
				addr.isDefault = addr.id === addressId;
			}
		});

		this.saveToStorage(addresses);

		const address = addresses.find((addr) => addr.id === addressId);
		if (!address) {
			throw new Error("Address not found");
		}

		return address;
	}
}
