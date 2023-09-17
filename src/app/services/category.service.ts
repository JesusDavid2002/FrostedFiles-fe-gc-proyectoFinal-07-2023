import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

let API_URL = 'http://localhost:8080/api/categories';
let API_URLSUB = 'http://localhost:8080/api/subcategories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private data: Category[] = [];
  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  categoryService: any;

  constructor(private http: HttpClient, private userService: UserService) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_URL}`).pipe(
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        throw error;
      })
    );
  }

  addCategory(category: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userService.getToken()}`,
      }),
    };

    return this.http.post(`${API_URL}/add`, category);
  }

  addSubcategory(categoryName: string, subcategoryName: string) {
    // Verificar primero si la categoría existe
    if (!this.categories.value.find((cat) => cat.nombre === categoryName)) {
      console.error(
        `La categoría ${categoryName} no existe. No se puede agregar subcategoría.`
      );
      return;
    }
    // Preparando las opciones del encabezado HTTP con el token
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.userService.getToken()}`
      })
    };
    // Realizar una petición POST al backend para crear la subcategoría
    this.http.post(`${API_URLSUB}/add`, {
      nombre: subcategoryName,
      "category": {
        "nombre": categoryName
      }
    }, httpOptions)
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
          location.reload();
        },
        (error) => {
          console.error('Error al crear la subcategoría:', error);
        }
      );
  }

  deleteCategoryByName(categoryName: string): Observable<any> {
    return this.http.delete(`${API_URL}/${categoryName}`);
  }

}