import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private API_URL = 'https://frosted-files-production.up.railway.app/api/comentarios';

  constructor(private http: HttpClient, private userService: UserService) { }

  getComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  addComment(comment: any): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userService.getToken());
    return this.http.post<any>(`${this.API_URL}/add`, comment).pipe(
      catchError(this.handleError)
    );
  }

  deleteCommentById(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }
  
}
