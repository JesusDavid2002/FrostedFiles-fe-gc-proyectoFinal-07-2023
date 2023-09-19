import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';
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
  subcategoriesList: Subcategory[] = [];

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
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe((result) => {
      this.categoriesList = result;
    });
    this.subcategoryService.getAllSubcategories().subscribe((result) => {
      this.subcategoriesList = result;
      
    });
  }

  crearCategoria() {
    const selectedValue = this.formCategory.get('existingCategory')?.value;
    const newCategoryName = this.formCategory.get('newCategoryName')?.value;

    if (!selectedValue) {
      this.categoryService.addCategory(newCategoryName).subscribe(
        (result) =>{
          console.log(result);
          
          location.reload();
        });
        
    } else {
      
      const subcategory: Subcategory = {
        nombre: newCategoryName,
        category: {
          nombre: selectedValue
        }
      };
      this.subcategoryService.addSubcategories(subcategory).subscribe(
        (result) => {
          console.log(result);
          location.reload();
        }
      );
    }
    this.activeModal.close('Close click');
  }
}
