import NewProductForm from "@/features/products/components/create/new-product-form";
import { Metadata } from "next/types";

interface EditProductPageProps {
	params: Promise<{
		id: string;
	}>;
}

const EditProductPage = async ({ params }: EditProductPageProps) => {
	const { id } = await params;
	
	return (
		<div className="w-full mt-4 gap-4 container mx-auto">
			<div className="flex-1 mx-auto">
				<NewProductForm mode="update" productId={id} />
			</div>
		</div>
	);
};

export const metadata: Metadata = {
	title: "Update Product | Shopiew Seller",
};

export default EditProductPage;
