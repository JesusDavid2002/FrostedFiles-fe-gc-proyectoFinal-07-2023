import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

let API_URLSUB = 'http://localhost:8080/api/subcategories';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private subcategories: BehaviorSubject<Subcategory[]> = new BehaviorSubject<Subcategory[]>([]);

  constructor(private http: HttpClient) { }

  getSubcategories(): Observable<Subcategory[]>{
    return this.subcategories.asObservable();
  }

  getAllSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${API_URLSUB}`);
  }

  getSubcategory(category: string): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${API_URLSUB}/${category}`);
  } 

  addSubcategories(subcategory: Subcategory){
    this.subcategories.next([...this.subcategories.value, subcategory]);
  }
}
