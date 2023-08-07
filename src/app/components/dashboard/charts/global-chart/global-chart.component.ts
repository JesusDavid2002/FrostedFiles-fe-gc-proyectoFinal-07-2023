import { Component } from '@angular/core';
import { GraphicService } from 'src/app/services/graphic.service';

@Component({
  selector: 'app-global-chart',
  templateUrl: './global-chart.component.html',
  styleUrls: ['./global-chart.component.css']
})
export class GlobalChartComponent {
  view: [number, number] = [800, 300];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Month';
  yAxisLabel: string = 'Value';
  
  constructor(private graphicService: GraphicService) {}

  getData(){
    return this.graphicService.getGlobalDataGraphic();
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
