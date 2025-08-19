export interface CategoryData {
   id?: number;
   name: string;
   imageUrl: string;
   children?: CategoryData[];
}

export class Category {
   id?: number;
   name: string;
   imageUrl: string;
   children: Category[];
   parentId?: number;

   constructor(data: CategoryData) {
      this.id = data.id;
      this.name = data.name;
      this.imageUrl = data.imageUrl || '';
      this.children = (data.children || []).map(child => new Category(child));
   }


}

