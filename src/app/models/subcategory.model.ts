export class Subcategory {
    id?: number;
    nombre: string = '';
    subsubcategories?: SubSubcategory[];
    open?: boolean;
}

export class SubSubcategory {
    nombre: string = '';
    open?: boolean;
}