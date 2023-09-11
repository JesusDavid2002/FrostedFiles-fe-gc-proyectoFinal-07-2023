import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.css'],
})
export class ModalCategoriaComponent {
  @Input() name: any;
  formCategory: FormGroup;
  categoriesList: Category[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService
  ) {
    this.formCategory = new FormGroup({
      existingCategory: new FormControl(''), // Para seleccionar categoría existente
      newCategoryName: new FormControl(''), // Para nombre de nueva categoría o subcategoría
    });
  }

  ngOnInit(): void {
    // this.categoriesList = this.categoryService.getData();
    this.categoryService.getAllCategories().subscribe(result => {
      this.categoriesList = result;
    });
  }

  crearCategoria() {
    const selectedValue = this.formCategory.get('existingCategory')?.value;
    const newCategoryName = this.formCategory.get('newCategoryName')?.value;

    if (selectedValue) {
      const path = selectedValue.split('/');
      if (path.length === 1) {
        // Se seleccionó solo una categoría, agregamos una subcategoría
        this.categoryService.addSubcategory(path[0], newCategoryName);
      } else if (path.length === 2) {
        if (path[1] === "newSubSubcategory") {
          // Se seleccionó "Nueva Sub-Subcategoría" bajo una categoría
          this.categoryService.addSubcategory(path[0], newCategoryName);
        } else {
          // Se seleccionó una subcategoría, agregamos una sub-subcategoría
          this.categoryService.addSubSubcategory(
            path[0],
            path[1],
            newCategoryName
          );
        }
      } else if (path.length === 3 && path[2] === "newSubSubcategory") {
        // Se seleccionó "Nueva Sub-Subcategoría" bajo una subcategoría
        this.categoryService.addSubSubcategory(
          path[0],
          path[1],
          newCategoryName
        );
      }
    } else {
      // Si no se seleccionó ninguna categoría o subcategoría, agregamos una nueva categoría principal
      let category = new Category();
      category.nombre = newCategoryName;
      this.categoryService.addCategory(category);
    }
    this.activeModal.close('Close click');
}

}
