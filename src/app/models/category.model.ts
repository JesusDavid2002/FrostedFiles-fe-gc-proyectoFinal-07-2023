export class Category {
    name?: string;
    subcategories?: Subcategory[];
    open?: boolean;
}

export interface Subcategory {
    name: string;
    subsubcategories?: SubSubcategory[];
    open?: boolean;
}

export interface SubSubcategory {
    name: string;
    open?: boolean;
}
