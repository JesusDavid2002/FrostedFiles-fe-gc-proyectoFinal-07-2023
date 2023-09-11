import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        opacity: 1,
        height: '*',
        visibility: 'visible',
      })),
      state('closed', style({
        opacity: 0,
        height: '0',
        visibility: 'hidden',
      })),
      transition('closed <=> open', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class CategoriesComponent {
  rightPanelStyle: any = {};
  contextMenu:string =  'closed';
  selectedCategory: any;
  selectedSubCategory: any;
  selectedSubSubCategory: any;
  categoriesList: Category[] = [];
  categories: Observable<Category[]> | undefined;

  constructor(private categoryService: CategoryService, private swalService: SwalService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(result => {
      this.categoriesList = result;
    });
    
    this.rightPanelStyle = {
      'display': 'none',
    };
  }

  desplegar(category: Category) {
    category.open = !category.open;
  }

  handleClickOnCategory(category: Category): void {
    this.desplegar(category);
    this.update(category.nombre);
  }

  update(categoryName?: string, subcategoryName?: string, subsubcategoryName?: string) {
    if (categoryName && !subcategoryName) {

      let path = `public/multimedia/${categoryName}`;
      this.categoryService.updateCategory(path);
    } else if (categoryName && subcategoryName) {
      let path = `public/multimedia/${categoryName}/${subcategoryName}`;
      this.categoryService.updateCategory(path);
      console.log(path);
    }
  }

  
  detectRightMouseClick($event: { which: number; clientX: any; clientY: any; }, subsub?:string,  subcategory?: Subcategory | string, category?: Category){
  
    if($event.which === 3){
      this.rightPanelStyle = {
        'display': 'block',
        'position': 'absolute',
        'left.px': $event.clientX - 30,
        'top.px': $event.clientY - 50
        
      };
      
      this.selectedSubSubCategory = subsub;
      this.selectedSubCategory = subcategory;
      this.selectedCategory = category;
      this.contextMenu = this.rightPanelStyle ? 'open' : 'closed';
    }
  }

  closeContextMenu() {
    this.rightPanelStyle = {
      'display': 'none'
    };
  }


  deleteSelectedItem() {   
    if(!this.selectedSubCategory){
        this.deleteCategory(this.selectedCategory.name);
      
    } else if (this.selectedSubSubCategory){
        this.deleteSubSubcategory(this.selectedCategory.name, this.selectedSubCategory.name, this.selectedSubSubCategory);

    } else{
        this.deleteSubcategory(this.selectedCategory.name, this.selectedSubCategory.name);
      
      
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
      console.error('El nombre de la categoría o subcategoría no puede estar vacío');
      return;
    }
    this.swalService.showDeleteAlertSubcategory(null, () => {
      console.log(`Intentando borrar la subcategoría: ${subcategoryName} de la categoría: ${categoryName}`);
      this.categoryService.deleteSubcategory(categoryName, subcategoryName);
    });
  }

  async deleteSubSubcategory(categoryName: string, subcategoryName: string, subSubcategoryName: string): Promise<void> {
    if (!categoryName || !subcategoryName || !subSubcategoryName) {
      console.error('El nombre de la categoría o subcategoría no puede estar vacío');
      return;
    }
    this.swalService.showDeleteAlertSubSubcategory(null, () => {
      console.log(`Intentando borrar la sub-subcategoría: ${subSubcategoryName} de la subcategoría: ${subcategoryName} en la categoría: ${categoryName}`);
      this.categoryService.deleteSubSubcategory(categoryName, subcategoryName, subSubcategoryName);
    });
  }


  pressing: boolean = false;

  startPress($event: TouchEvent, subsub?:string,  subcategory?: Subcategory | string, category?: Category) {
    this.pressing = true;
    let position = $event.touches[0];
    let positionX = position.clientX;
    let positionY = position.clientY;

    console.log('Pulsando...');

    if($event instanceof TouchEvent){
      this.rightPanelStyle = {
        'display': 'block',
        'position': 'absolute',
        'left.px': positionX + 50,
        'top.px': positionY - 50
      };

    }
      this.selectedSubSubCategory = subsub;
      this.selectedSubCategory = subcategory;
      this.selectedCategory = category;
    // Aquí puedes llamar a tu método o ejecutar la lógica que deseas mientras se mantenga pulsado.
  }

  endPress() {
    this.pressing = false;
    console.log('Soltado.');
    // Aquí puedes realizar tareas adicionales al soltar el dedo.
  }

  @HostListener('window:mouseup', ['$event'])
  @HostListener('window:touchend', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.pressing) {
      this.endPress();
    }
  }
}
