import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private data: Category[] = [];

  constructor() { }

  getData(): Category[]{
    return this.data;
  }

  setData(data: Category[]){
    this.data = data;
  }
  
  private selectedCategorySource = new BehaviorSubject<string>(''); 
  selectedCategory$ = this.selectedCategorySource.asObservable();

  updateCategory(categoryName: string) {
    this.selectedCategorySource.next(categoryName);
  }
}
