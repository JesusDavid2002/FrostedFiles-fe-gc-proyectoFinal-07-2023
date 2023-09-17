import { Injectable } from '@angular/core';
import { Acciones, Files } from '../models/files.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ModeloCompartir } from '../models/modelo-compartir.model';
import { UserService } from './user.service';

let API_URL = 'http://localhost:8080/api/files';
let API_URL_ACCIONES = 'http://localhost:8080/api/acciones';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  selectedFileName: string = '';

  constructor(private http: HttpClient, private userService: UserService) {}

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
  
  getFilesBySubcategory(subcategory: string): Observable<Files[]>{
    return this.http.get<Files[]>(`${API_URL}/subcategories/${subcategory}`);
  }

  getPDF(nombre: string): Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf'
    });
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

  postDownloadData(accion: Acciones): Observable<any>{
    return this.http.post<any>(`${API_URL_ACCIONES}/add`, accion);
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
    
  compartirArchivo(requestData: any){
    let url = `${API_URL}/compartir`;
    return this.http.post(url, requestData);
  }
}
