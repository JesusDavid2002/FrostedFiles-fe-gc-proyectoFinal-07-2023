import { Category } from "./category.model";
import { Subcategory } from "./subcategory.model";

export class Files {
    id: any;
    nombre: string = '';
    extension: string = '';
    tamano: number = 0;
    fechaSubida: string = '';
    visibilidad: boolean = true;
    contenido: any;
    categories: Category = new Category();
    subcategories: Subcategory = new Subcategory();
}
