import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

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
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {
    this.formCategory = new FormGroup({
      existingCategory: new FormControl(''),
      newCategoryName: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((result) => {
      this.categoriesList = result;
    });
  }

  crearCategoria() {
    const selectedValue = this.formCategory.get('existingCategory')?.value;
    const newCategoryName = this.formCategory.get('newCategoryName')?.value;
    if (selectedValue) {
      // Se seleccionó solo una categoría, agregamos una subcategoría
      this.subcategoryService.addSubcategories(newCategoryName);
    } else {
      // Si no se seleccionó ninguna categoría o subcategoría, agregamos una nueva categoría principal
      this.categoryService.addCategory(newCategoryName);
    }
    this.activeModal.close('Close click');
  }
}
