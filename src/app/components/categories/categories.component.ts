import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/models/category.model';
import { Subcategory } from 'src/app/models/subcategory.model';
import { CategoryService } from 'src/app/services/category.service';
import { SwalService } from 'src/app/services/swal.service';
import { Roles } from 'src/app/models/roles.model';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('expandCollapse', [
      state(
        'open',
        style({
          opacity: 1,
          height: '*',
          visibility: 'visible',
        })
      ),
      state(
        'closed',
        style({
          opacity: 0,
          height: '0',
          visibility: 'hidden',
        })
      ),
      transition('closed <=> open', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class CategoriesComponent {
  rightPanelStyle: any = {};
  contextMenu: string = 'closed';
  @Output() categorySelected = new EventEmitter<string>();
  @Output() subcategorySelected = new EventEmitter<string>();
  selectedCategory: any;
  selectedSubCategory: any;
  selectedSubSubCategory: any;
  categoriesList: Category[] = [];
  subcategoriesList: Subcategory[] = [];
  categories: Observable<Category[]> | undefined;
  roles: Roles[] = [];
  subcategoriesByCategory: { [categoryName: string]: Subcategory[] } = {};

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((result) => {
      this.categoriesList = result;
      this.categoriesList.forEach((category) => {
        this.subcategoryService.getSubcategory(category.nombre).subscribe(
          (subcategories) => {
            this.subcategoriesByCategory[category.nombre] = subcategories;
          },
          (error) => {
            console.error(
              `Error al obtener subcategorías para ${category.nombre}:`,
              error
            );
          }
        );
      });
      console.log(result);
    });
  }

  onCategoryClick(category: string) {
    this.categorySelected.emit(category);
  }

  onSubcategoryClick(subcategory: string) {
    this.subcategorySelected.emit(subcategory);
  }

  desplegar(category: Category) {
    category.open = !category.open;
  }

  desplegarSub(subcategory: Subcategory) {
    subcategory.open = !subcategory.open;
  }

  handleClickOnCategory(category: Category): void {
    this.desplegar(category);
    this.update(category.nombre);
    this.onCategoryClick(category.nombre);
  }

  handleClickOnSubcategory(subcategory: Subcategory): void {
    this.desplegarSub(subcategory);
    this.update(subcategory.nombre);
    this.onSubcategoryClick(subcategory.nombre);
  }

  update(categoryName?: string, subcategoryName?: string) {}

  detectRightMouseClick(
    $event: { which: number; clientX: any; clientY: any },
    subsub?: string,
    subcategory?: Subcategory | string,
    category?: Category
  ) {
    if ($event.which === 3) {
      this.rightPanelStyle = {
        display: 'block',
        position: 'absolute',
        'left.px': $event.clientX - 30,
        'top.px': $event.clientY - 50,
      };
      this.selectedSubSubCategory = subsub;
      this.selectedSubCategory = subcategory;
      this.selectedCategory = category;
      this.contextMenu = this.rightPanelStyle ? 'open' : 'closed';
    }
  }

  closeContextMenu() {
    this.rightPanelStyle = {
      display: 'none',
    };
  }

  deleteSelectedItem() {
    if (this.selectedSubCategory) {
      this.deleteSubcategory(
        this.selectedCategory.nombre,
        this.selectedSubCategory.nombre
      );
    } else {
      this.deleteCategory(this.selectedCategory.nombre);
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
      this.categoryService
        .deleteCategoryByName(categoryName)
        .subscribe((result) => {
          console.log(result);
          location.reload();
        });
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
      this.subcategoryService
        .deleteSubcategoryByName(subcategoryName)
        .subscribe((result) => {
          console.log(result);
          location.reload();
        });
    });
  }

  pressing: boolean = false;

  startPress(
    $event: TouchEvent,
    subsub?: string,
    subcategory?: Subcategory | string,
    category?: Category
  ) {
    this.pressing = true;
    let position = $event.touches[0];
    let positionX = position.clientX;
    let positionY = position.clientY;

    console.log('Pulsando...');

    if ($event instanceof TouchEvent) {
      this.rightPanelStyle = {
        display: 'block',
        position: 'absolute',
        'left.px': positionX + 50,
        'top.px': positionY - 50,
      };
    }
    this.selectedSubSubCategory = subsub;
    this.selectedSubCategory = subcategory;
    this.selectedCategory = category;
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

  addSubcategoryToCategory(category: Category) {
    const subcategoryName = prompt(
      'Ingrese el nombre de la nueva subcategoría:'
    );
    if (subcategoryName && subcategoryName.trim() !== '') {
      this.subcategoryService.addSubcategories(subcategoryName);
    }
  }
  
}
