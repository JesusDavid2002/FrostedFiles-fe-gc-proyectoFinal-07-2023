import { Injectable } from '@angular/core';
import { GlobalGraphic, MonthlyGraphic } from '../models/graphic.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

let API_URL = 'https://frosted-files-production.up.railway.app/api/acciones';
let API_URL_LOCAL = 'http://localhost:8080/api/acciones';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  constructor(private http: HttpClient) {}

  getMonthlyDataGraphic(): Observable<MonthlyGraphic[]>{
    return this.http.get<MonthlyGraphic[]>(`${API_URL}/estadisticasMensuales`);
  }

  getGlobalDataGraphic(): Observable<GlobalGraphic[]>{
    return this.http.get<GlobalGraphic[]>(`${API_URL}/estadisticasAnuales`);
  }
}
