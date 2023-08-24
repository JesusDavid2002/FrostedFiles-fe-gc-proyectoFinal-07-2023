import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private subcategories: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

  constructor() { }

  getSubcategories(): Observable<Subcategory[]>{
    return this.subcategories.asObservable();
  }

  addSubcategories(subcategory: Subcategory){
    this.subcategories.next([...this.subcategories.value, subcategory]);
  }
}
