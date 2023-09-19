import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Roles } from '../models/roles.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = 'http://localhost:8080/api/admin/roles';

  constructor(private http: HttpClient, private userService: UserService) {}

  getRoles(): Observable<Roles[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getToken());
    return this.http.get<Roles[]>(`${this.apiUrl}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  asignarRol(usuarioId: number, rol: Roles): Observable<Roles> {
    const url = `${this.apiUrl}/${usuarioId}/add`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getToken());
    return this.http.put<Roles>(url, rol, { headers });
  }

  modificarRol(usuarioId: number, rol: Roles): Observable<Roles> {
    const url = `${this.apiUrl}/${usuarioId}/update`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getToken());
    return this.http.put<Roles>(url, rol, { headers });
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
}