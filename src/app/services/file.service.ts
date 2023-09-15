import { Injectable } from '@angular/core';
import { Files } from '../models/files.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ModeloCompartir } from '../models/modelo-compartir.model';
import { UserService } from './user.service';

let API_URL = 'http://localhost:8080/api/files';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private lastVisit: number = 0;
  private visitCount: number = 0;
  selectedFileName: string = '';

  constructor(private http: HttpClient, private userService: UserService) {
    // const savedLastVisit = localStorage.getItem('lastVisit');
    // const savedVisitCount = localStorage.getItem('visitCount');

    // if (savedLastVisit) {
    //   this.lastVisit = +savedLastVisit;
    // }

    // if (savedVisitCount) {
    //   this.visitCount = +savedVisitCount;
    // }
  }

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

  getPDF(nombre: string): Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
    const encodedNombre = encodeURIComponent(nombre); // Codifica el nombre del archivo
    const url = `${API_URL}/pdf/${nombre}`;
    console.log(url);
    
    return this.http.get(url,{headers: headers, responseType: 'blob'});
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

  postCompartir(modelo: ModeloCompartir): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    let formData = new FormData();
    formData.append('destinatario', modelo.destinatario);
    formData.append('asunto', modelo.asunto);
    formData.append('mensaje', modelo.mensaje);
    formData.append('archivo', modelo.archivo);
    return this.http.post(`${API_URL}/compartir`, formData, {headers: headers});
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
