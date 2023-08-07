import { Component } from '@angular/core';
import { GraphicService } from 'src/app/services/graphic.service';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent {
  view: [number, number] = [800, 600];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private graphicService: GraphicService) {}

  getData(){
    return this.graphicService.getMonthlyDataGraphic();
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
