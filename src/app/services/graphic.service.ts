import { Injectable } from '@angular/core';
import { GlobalGraphic, MonthlyGraphic } from '../models/graphic.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  private data: MonthlyGraphic[] = [
    {
      name: "Upload Files",
      value: 600
    },
    {
      name: "Download Files",
      value: 450
    },
    {
      name: "Share Files",
      value: 860
    },
    {
      name: "Visualization Files",
      value: 1500
    }
  ];

  getMonthlyDataGraphic(){
    return this.data;
  }

  private dataGlobal: GlobalGraphic[]  = [
    {
      name: 'January',
      series: [
      {'name': '2021','value': 150},
      {'name': '2022','value': 230}
      ]
  },
    {
      name: 'Febrary',
      series: [{
        'name': '2021',
        'value': 210
      }]
    }
  ];

  getGlobalDataGraphic(){
    return this.dataGlobal;
  }
}
