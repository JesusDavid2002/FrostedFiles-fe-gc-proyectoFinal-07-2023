export class Subcategory {
    name?: string;
    subsubcategories?: SubSubcategory[];
    open?: boolean;
}

export class SubSubcategory {
    name?: string;
    open?: boolean;
}