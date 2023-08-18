import { Injectable } from '@angular/core';
import { Files } from '../models/files.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private data: Files[] = [];
  private lastVisit: number = 0;
  private visitCount: number = 0;

  constructor(private http: HttpClient) {
    const savedLastVisit = localStorage.getItem('lastVisit');
    const savedVisitCount = localStorage.getItem('visitCount');

    if (savedLastVisit) {
      this.lastVisit = +savedLastVisit;
    }

    if (savedVisitCount) {
      this.visitCount = +savedVisitCount;
    }
  }

  getData(): Files[]{
    return this.data;
  }

  setData(data: Files[]){
    this.data = data;
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
}
