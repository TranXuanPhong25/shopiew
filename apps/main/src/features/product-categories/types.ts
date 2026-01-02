export interface ProductCategory {
	id?: number;
	name: string;
	imageUrl: string | null;
	children?: ProductCategory[];
	slug?: string; // URL-friendly name
	level?: number; // Category hierarchy level
	featured?: boolean; // Whether to show in featured sections
	parentId?: number; // Parent category ID
	description?: string; // Category description
}
