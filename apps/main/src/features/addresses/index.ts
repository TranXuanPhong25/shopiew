// Types
export type {
	Address,
	CreateAddressRequest,
	UpdateAddressRequest,
	AddressListResponse,
} from "./types/address.types";

// Services
export { AddressService } from "./services/address.service";

// Hooks
export {
	useAddresses,
	useCreateAddress,
	useUpdateAddress,
	useDeleteAddress,
	useSetDefaultAddress,
} from "./hooks/use-addresses.hook";

// Components
export { AddressCard } from "./components/address-card";
export { AddressFormDialog } from "./components/address-form-dialog";
export { DeleteConfirmationDialog } from "./components/delete-confirmation-dialog";
