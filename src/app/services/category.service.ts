import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subcategory } from '../models/subcategory.model';
import { SubcategoryService } from './subcategory.service';
import { HttpClient } from '@angular/common/http';

let API_URL = 'http://localhost:8080/api/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private data: Category[] = [];

  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  categoryService: any;

  constructor(private subcategoryService: SubcategoryService, private http: HttpClient) {
    this.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories.next(data);
      },
      (error) => {
        console.error('Error cargando categorías iniciales:', error);
      }
    );
  }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}`);
  }

  setData(data: Category[]) {
    this.data = data;
  }

  private selectedCategorySource = new BehaviorSubject<string>('');
  selectedCategory$ = this.selectedCategorySource.asObservable();

  updateCategory(categoryName: string) {
    this.selectedCategorySource.next(categoryName);
  }

  addCategory(category: Category) {
    if (category.subcategories) {
      category.subcategories.forEach((element) =>
        this.subcategoryService.addSubcategories(element)
      );
    }
    this.categories.next([...this.categories.value, category]);
    console.log('Categorías después de agregar:', this.categories.value);
  }

  addSubcategory(categoryName: string, subcategoryName: string) {
    // Verificar primero si la categoría existe
    if (!this.categories.value.some((cat) => cat.nombre === categoryName)) {
      console.error(
        `La categoría ${categoryName} no existe. No se puede agregar subcategoría.`
      );
      return;
    }
    // Realizar una petición POST al backend para crear la subcategoría
    this.http.post(`${API_URL}/${categoryName}/subcategories`, { nombre: subcategoryName })
      .subscribe(
        (response) => {
          // Si la categoría existe, actualizar las categorías con la nueva subcategoría
          const updatedCategories = this.categories.value.map(category => {
            if (category.nombre === categoryName) {
              return {
                ...category,
                subcategories: [...(category.subcategories || []), { nombre: subcategoryName }]
              }
            }
            return category;
          });
          this.categories.next(updatedCategories);
        },
        (error) => {
          console.error('Error al crear la subcategoría:', error);
        }
      );
  }


  addSubSubcategory(
    categoryName: string,
    subcategoryName: string,
    subSubcategoryName: string
  ) {
    this.categories.next(
      this.categories.value.map((category) => {
        if (category.nombre === categoryName && category.subcategories) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (subcategory.nombre === subcategoryName) {
                return {
                  ...subcategory,
                  subsubcategories: [
                    ...(subcategory.subsubcategories || []),
                    { nombre: subSubcategoryName },
                  ],
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  }

  deleteCategory(categoryName: string) {
    console.log('Categorías antes de eliminar:', this.categories.value);
    const updatedCategories = this.categories.value.filter(
      (category) => category.nombre !== categoryName
    );
    console.log('Categorías después de eliminar:', updatedCategories);
    this.categories.next(updatedCategories);
  }

  deleteSubcategory(categoryName: string, subcategoryName: string | null) {
    this.categories.next(
      this.categories.value.map((category) => {
        if (category.nombre === categoryName && category.subcategories) {
          let updateSubcategories = category.subcategories.filter(
            (subcategory) => subcategory.nombre !== subcategoryName
          );
          return {
            ...category,
            subcategories: updateSubcategories,
          };
        }
        return category;
      })
    );
  }

  deleteSubSubcategory(
    categoryName: string,
    subcategoryName: string,
    subSubcategoryName: string
  ): void {
    this.categories.next(
      this.categories.value.map((category) => {
        if (category.nombre === categoryName && category.subcategories) {
          return {
            ...category,
            subcategories: category.subcategories.map((subcategory) => {
              if (
                subcategory.nombre === subcategoryName &&
                subcategory.subsubcategories
              ) {
                return {
                  ...subcategory,
                  subsubcategories: subcategory.subsubcategories.filter(
                    (subSubcategory) =>
                      subSubcategory.nombre !== subSubcategoryName
                  ),
                };
              }
              return subcategory;
            }),
          };
        }
        return category;
      })
    );
  }

  
}