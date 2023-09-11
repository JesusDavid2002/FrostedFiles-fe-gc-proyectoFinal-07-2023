import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subcategory } from '../models/subcategory.model';
import { SubcategoryService } from './subcategory.service';
import { HttpClient } from '@angular/common/http';

let API_URL = 'http://localhost:8080/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private data: Category[] = [];
  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([
    // {
    //   name: 'Category 1',
    //   subcategories: [
    //     {'name': 'Subcategoria1',
    //               'subsubcategories': [{
    //                 'name': 'subsubcategoria1'
    //               }]},
    //     {'name': 'Subcategory 1.2' }
    //   ]},
    //     { nombre: 'Category 2' },
    //     { nombre: 'Category 3' },
    //     { nombre: 'Category 4' }
    ]);
  
  constructor(private subcategoryService: SubcategoryService, private http: HttpClient) { }

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
    if(category.subcategories){
      category.subcategories.forEach(element => 
        this.subcategoryService.addSubcategories(element));
    }
    this.categories.next([...this.categories.value, category]);
  }

  deleteCategory(categoryName: string) {
    console.log("Categorías antes de eliminar:", this.categories.value);
    const updatedCategories = this.categories.value.filter(category => category.nombre !== categoryName);
    console.log("Categorías después de eliminar:", updatedCategories);
    this.categories.next(updatedCategories);
  }


  deleteSubcategory(categoryName: string, subcategoryName: string | null) {
    this.categories.next(this.categories.value.map(category => {
      if (category.nombre === categoryName && category.subcategories) {
        let updateSubcategories = category.subcategories.filter(subcategory => subcategory.name !== subcategoryName)
        return {
          ...category,
          subcategories: updateSubcategories

          //subcategories: category.subcategories.filter(subcategory => subcategory.name !== subcategoryName)
        }
      }
      return category;
    }));
  }

  deleteSubSubcategory(categoryName: string, subcategoryName: string, subSubcategoryName: string): void {
    this.categories.next(
      this.categories.value.map(category => {
        if (category.nombre === categoryName && category.subcategories) {
          return {
            ...category,
            subcategories: category.subcategories.map(subcategory => {
              if (subcategory.name === subcategoryName && subcategory.subsubcategories) {
                return {
                  ...subcategory,
                  subsubcategories: subcategory.subsubcategories.filter(subSubcategory => subSubcategory.name !== subSubcategoryName)
                };
              }
              return subcategory;
            })
          };
        }
        return category;
      })
    );
  }

  addSubcategory(categoryName: string, subcategoryName: string) {
    const updatedCategories = this.categories.value.map(category => {
      if (category.nombre === categoryName) {
        return {
          ...category,
          subcategories: [...(category.subcategories || []), { name: subcategoryName }]
        }
      }
      return category;
    });
    this.categories.next(updatedCategories);
  }


  addSubSubcategory(categoryName: string, subcategoryName: string, subSubcategoryName: string) {
    this.categories.next(this.categories.value.map(category => {
      if (category.nombre === categoryName && category.subcategories) {
        return {
          ...category,
          subcategories: category.subcategories.map(subcategory => {
            if (subcategory.name === subcategoryName) {
              return {
                ...subcategory,
                subsubcategories: [...(subcategory.subsubcategories || []), { name: subSubcategoryName }]
              }
            }
            return subcategory;
          })
        }
      }
      return category;
    }));
  }


}
