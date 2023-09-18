import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private API_URL = 'http://localhost:8080/api/comentarios';

  constructor(private http: HttpClient) { }

  getComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.API_URL}/add`, comment);
  }

  deleteCommentById(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
