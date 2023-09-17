import { Category } from "./category.model";

export class Subcategory {
    id?: number;
    nombre: string = '';
    categoria: Category = new Category();
    subsubcategories?: SubSubcategory[];
    open?: boolean;
}

export class SubSubcategory {
    nombre: string = '';
    open?: boolean;
}