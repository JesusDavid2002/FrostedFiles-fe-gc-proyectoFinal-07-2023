import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL real del back, una vez tengamos el railway funcionando esta dirección debería cambiar
  private API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(`${this.API_URL}/api/admin/users`);
  }

  setSession(authResult: any) {
    sessionStorage.setItem('token', authResult.token);
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/auth/register`, userData).pipe(
      tap((res: any) => {
        this.setSession(res);
      })
    );
  }

  login(userData: any) {
    console.log(userData);
    const headers = new HttpHeaders({
      'Content-Type':'application/json',   
    });
    return this.http.post(`${this.API_URL}/auth/login`, userData).pipe(
      tap((res: any) => {
        this.setSession(res);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  deleteUser(email: string) {
    return this.http.delete(`${this.API_URL}/api/admin/users/${email}`);
  }
}
