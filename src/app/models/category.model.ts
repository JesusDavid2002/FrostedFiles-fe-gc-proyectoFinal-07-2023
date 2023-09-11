import { Subcategory } from "./subcategory.model";

export class Category {
    id?: number;
    nombre: string = '';
    subcategories?: Subcategory[];
    open?: boolean;
}


