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
  selectedFileName: string = '';

  setSelectedFileName(name: string) {
    this.selectedFileName = name;
  }

  getSelectedFileName() {
    return this.selectedFileName;
  }
    
  getAllFiles(): Observable<Files[]>{
    return this.http.get<Files[]>(`${API_URL}`);
  }

  getFilesByName(file: string): Observable<Files>{
    return this.http.get<Files>(`${API_URL}/nombre/${file}`);
  }

  getFilesByCategory(category: string): Observable<Files[]>{
    return this.http.get<Files[]>(`${API_URL}/categories/${category}`);
  }

  getPDF(nombre: string): Observable<Uint8Array>{
    return this.http.get<Uint8Array>(`${API_URL}/pdf/${nombre}`);
  }

  postFiles(fileData: Files, file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('nombre', fileData.nombre);
    formData.append('extension', fileData.extension);
    formData.append('tamano', fileData.tamano.toString());
    formData.append('fechaSubida', fileData.fechaSubida);
    formData.append('visibilidad', fileData.visibilidad.toString());
    formData.append('categories', fileData.categories.nombre);
    formData.append('subcategories', fileData.subcategories.nombre);
    return this.http.post(`${API_URL}/add`, formData);
  }

  postCompartir(formData: FormData): Observable<any>{
    return this.http.post(`${API_URL}/compartir`, formData);
  }

  updateFiles(nombre: string, file: any): Observable<any>{
    return this.http.patch(`${API_URL}/${nombre}`, file);
  }

  deleteFiles(fileNombre: string): Observable<any>{
    return this.http.delete(`${API_URL}/${fileNombre}`);
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
    
  compartirArchivo(requestData: any){
    let url = `${API_URL}/compartir`;
    return this.http.post(url, requestData);
  }
}
