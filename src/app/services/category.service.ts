import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private data: Category[] = [];
  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([
    { name: 'Category 1',
      subcategories: ['Subcategory 1.1', 'Subcategory 1.2']
    },
    { name: 'Category 2' },
    { name: 'Category 3' },
    { name: 'Category 4' }]);

  constructor() { }

  getData(): Observable<Category[]>{
    // return this.data;
    return this.categories;
  }

  setData(data: Category[]){
    this.data = data;
  }
  
  private selectedCategorySource = new BehaviorSubject<string>(''); 
  selectedCategory$ = this.selectedCategorySource.asObservable();

  updateCategory(categoryName: string) {
    this.selectedCategorySource.next(categoryName);
  }

  addCategory(category: Category){
    // this.categories.value.push(category);
    this.categories.next(this.categories.value.concat(category));
  }
}
