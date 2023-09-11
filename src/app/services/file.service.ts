import { Injectable } from '@angular/core';
import { Files } from '../models/files.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

let API_URL = 'http://localhost:8080/api/files';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private data: Files[] = [];
  private lastVisit: number = 0;
  private visitCount: number = 0;

  constructor(private http: HttpClient) {
    // const savedLastVisit = localStorage.getItem('lastVisit');
    // const savedVisitCount = localStorage.getItem('visitCount');

    // if (savedLastVisit) {
    //   this.lastVisit = +savedLastVisit;
    // }

    // if (savedVisitCount) {
    //   this.visitCount = +savedVisitCount;
    // }
  }

  getAllFiles(): Observable<Files[]>{
    return this.http.get<Files[]>(`${API_URL}`);
  }

  getFilesByCategory(category: string): Observable<Files[]>{
    return this.http.get<Files[]>(`${API_URL}/categories/${category}`);
  }

  postFiles(fileData: Files, file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('nombre', fileData.nombre);
    formData.append('extension', fileData.extension);
    formData.append('tamano', fileData.tamano.toString());
    formData.append('fechaSubida', fileData.fechaSubida);
    formData.append('visibilidad', fileData.visibilidad.toString());
    formData.append('categories', JSON.stringify(fileData.categories));
    formData.append('subcategories', JSON.stringify(fileData.subcategories));
    return this.http.post(`${API_URL}/add`, formData);
  }

  postCompartir(formData: FormData): Observable<any>{
    return this.http.post(`${API_URL}/compartir`, formData);
  }

  getById(id: number): Observable<Files>{
    return this.http.get<Files>(''+id);
  }
  
  increaseVisitCount(): void {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastVisit >= 3600000) { 
      this.visitCount++;
      this.lastVisit = currentTime;
      localStorage.setItem('lastVisit', this.lastVisit.toString());
      localStorage.setItem('visitCount', this.visitCount.toString());
    }
  }

  getVisitCount(): number {
    return this.visitCount;
  }
  
  deleteFile(id: number): Observable<Files>{
    return this.http.delete<Files>(''+id);
  }
  
  compartirArchivo(requestData: any){
    let url = `${API_URL}/compartir`;
    return this.http.post(url, requestData);
  }
}
