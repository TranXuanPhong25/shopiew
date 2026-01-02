export interface ProductCategory {
	id?: number;
	name: string;
	imageUrl: string | null;
	children?: ProductCategory[];
}
