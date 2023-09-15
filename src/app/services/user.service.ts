import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // URL real del back, una vez tengamos el railway funcionando esta dirección debería cambiar
  private API_URL = 'http://localhost:8080';
  private userEmail: string | null = null;
  private userEmailKey = 'userEmail';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<any[]>(`${this.API_URL}/api/admin/users`);
  }

  getUserDetailsByEmail(email: string) {
    return this.http.get<any>(`${this.API_URL}/api/admin/users/${email}`);
  }

  setUserEmail(email: string) {
    localStorage.setItem(this.userEmailKey, email);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }

  setSession(authResult: any) {
    sessionStorage.setItem('token', authResult.token);
    sessionStorage.setItem('email', authResult.email);
  }

  setAuthenticatedUser(email: string) {
    this.userEmail = email;
    this.setUserEmail(email)
  }

  updateUserName(newName: string) {
    const userEmail = this.getUserEmail();
    console.log("userEmail:"+userEmail);
    return this.http.patch(`${this.API_URL}/api/admin/users/${userEmail}`, newName);
  }

  register(userData: any) {
    return this.http.post(`${this.API_URL}/auth/register`, userData).pipe(
      tap((res: any) => {
        console.log("userData"+userData)
        this.setSession(res);
        this.setAuthenticatedUser(userData.email);
      })
    );
  }

  login(userData: any) {
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
