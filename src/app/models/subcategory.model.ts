export class Subcategory {
    id?: number;
    nombre: string = '';
    subsubcategories?: SubSubcategory[];
    open?: boolean;
}

export class SubSubcategory {
    name?: string;
    open?: boolean;
}