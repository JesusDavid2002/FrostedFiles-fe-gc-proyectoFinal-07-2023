import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  rightPanelStyle: any = {};
  selectedCategory: any;
  currentRecord: any;
  categoriesList: Category[] = [];
  categories: Observable<Category[]> | undefined;

  constructor(private categoryService: CategoryService, private swalService: SwalService) {
    this.categories = this.categoryService.getData();
  }

  ngOnInit(): void{
    this.categoryService.getData().subscribe(categories => {
    this.categoriesList = categories;
    });
    this.rightPanelStyle = {
      'display': 'none',
    };
  }

  desplegar(category: Category) {
    category.open = !category.open;
  }
  
  update(categoryName?: string, subcategoryName?: string){
    if( categoryName && !subcategoryName ){

      let path = `public/multimedia/${categoryName}`;
      this.categoryService.updateCategory(path);
    } else if (categoryName && subcategoryName) {
      let path = `public/multimedia/${categoryName}/${subcategoryName}`;
      this.categoryService.updateCategory(path);
      console.log(path);
    }
  }

  detectRightMouseClick($event: { which: number; clientX: any; clientY: any; }, subcategory?: Subcategory | null, category?: Category){
    if($event.which === 3){
      this.rightPanelStyle = {
        'display': 'block',
        'position': 'absolute',
        'left.px': $event.clientX,
        'top.px': $event.clientY
      };

      this.currentRecord = subcategory;
      this.selectedCategory = category;
    }
  }

  closeContextMenu(){
    this.rightPanelStyle = {
      'display': 'none'
    };
  }

  deleteSelectedItem() {
    console.log(this.currentRecord.toString());
    
    if(this.currentRecord){
      this.deleteSubcategory(this.selectedCategory.name, this.currentRecord.name);
    }
    // AQUI ES EL ERROR SI SE QUITA PODRAS ELIMINAR LAS SUBCATEGORIAS PERO NO LAS CATEGORIAS
    // SI ESTA PODRAS ELIMINAR TODA LA CATEGORIA PERO NO SUS SUBCATEGORIAS
    else if (this.selectedCategory) {
      this.deleteCategory(this.selectedCategory.name);
    }
    

    this.closeContextMenu();
  }
  
  
  async deleteCategory(categoryName?: string) {
    if (!categoryName) {
      console.error('El nombre de la categoría no puede estar vacío');
      return;
    }
    this.swalService.showDeleteAlertCategory(null, () => {
      console.log('Intentando borrar la categoría:', categoryName);
      this.categoryService.deleteCategory(categoryName);
    });
  }

  async deleteSubcategory(categoryName?: string, subcategoryName?: string) {
    if (!categoryName || !subcategoryName) {
      console.error(
        'El nombre de la categoría o subcategoría no puede estar vacío'
      );
      return;
    }
    this.swalService.showDeleteAlertSubcategory(null, () => {
      console.log(
        `Intentando borrar la subcategoría: ${subcategoryName} de la categoría: ${categoryName}`
      );
      this.categoryService.deleteSubcategory(categoryName, subcategoryName);
    });
  }
}
