import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL real del back, una vez tengamos el railway funcionando esta dirección debería cambiar
  private API_URL = 'http://localhost:8080';
  private isAuthenticated = false;
  private userEmail: string | null = null;

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(`${this.API_URL}/api/admin/users`);
  }

  getUserDetailsByEmail(email: string) {
    return this.http.get<any>(`${this.API_URL}/api/admin/users/${email}`);
  }

  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }

  setSession(authResult: any) {
    sessionStorage.setItem('token', authResult.token);
    sessionStorage.setItem('email', authResult.email);
  }

  setAuthenticatedUser(email: string) {
    this.isAuthenticated = true;
    this.userEmail = email;
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/auth/register`, userData).pipe(
      tap((res: any) => {
        this.setSession(res);
        this.setAuthenticatedUser(userData.username);
      })
    );
  }

  

  login(userData: any) {
    // console.log(userData); Solo para debuggar
    const headers = new HttpHeaders({
      'Content-Type':'application/json',   
    });
    return this.http.post(`${this.API_URL}/auth/login`, userData).pipe(
      tap((res: any) => {
        this.setSession(res);
        this.setAuthenticatedUser(userData.username);
      })
    );
  }

  getUserDetails(email: string) {
    return this.http.get<any>(`${this.API_URL}/api/admin/users/details/${email}`);
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getSessionEmail() {
    return sessionStorage.getItem('email');
  }

  deleteUser(email: string) {
    return this.http.delete(`${this.API_URL}/api/admin/users/${email}`);
  }
}
