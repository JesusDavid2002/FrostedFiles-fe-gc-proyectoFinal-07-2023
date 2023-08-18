import { Injectable } from '@angular/core';
import { Files } from '../models/files.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private data: Files[] = [];

  constructor(private http: HttpClient) { }

  getData(): Files[]{
    return this.data;
  }

  setData(data: Files[]){
    this.data = data;
  }

  getById(id: number): Observable<Files>{
    return this.http.get<Files>(''+id);
  }
  deleteFile(id: number): Observable<Files>{
    return this.http.delete<Files>(''+id);
  }
}
