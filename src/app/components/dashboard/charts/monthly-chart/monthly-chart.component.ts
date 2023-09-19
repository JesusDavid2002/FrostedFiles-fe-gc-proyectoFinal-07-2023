import { Component } from '@angular/core';
import { MonthlyGraphic } from 'src/app/models/graphic.model';
import { GraphicService } from 'src/app/services/graphic.service';

@Component({
  selector: 'app-monthly-chart',
  templateUrl: './monthly-chart.component.html',
  styleUrls: ['./monthly-chart.component.css']
})
export class MonthlyChartComponent {
  view: [number, number] = [800, 300];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  estadisticaMensual: MonthlyGraphic[] = [];
  mesActual: string = '';

  constructor(public graphicService: GraphicService) {}

  ngOnInit(): void {
    let fecha = new Date();
    let formato = {month: 'long' as const};
    this.mesActual = fecha.toLocaleDateString('es-ES', formato);

    this.graphicService.getMonthlyDataGraphic().subscribe(data => {
      if (typeof data === 'object') {
        let datosTransformados = this.extractData(data);
        let datosFiltrados = datosTransformados.find(item => item.name === this.mesActual);
        
        if (datosFiltrados && datosFiltrados.series) {
          this.estadisticaMensual = datosFiltrados.series;
        } else {
          console.log('Los datos recibidos no tienen la estructura esperada.');
          this.estadisticaMensual = [];
        }
      } else {
        console.error('Los datos recibidos no son de tipo objeto.');
        this.estadisticaMensual = [];
      }
    });
  }

  extractData(data: any): any[] {
    const estadisticaMensual: any[] = [];
  
    for (const mes in data) {
      if (data.hasOwnProperty(mes)) {
        const accionesPorMes = data[mes];
        if (typeof accionesPorMes === 'object' && accionesPorMes !== null) {
          const accionesTransformadas = [];
  
          for (const tipoAccion in accionesPorMes) {
            if (accionesPorMes.hasOwnProperty(tipoAccion)) {
              const cantidad = accionesPorMes[tipoAccion];
              accionesTransformadas.push({ name: tipoAccion, value: cantidad });
            }
          }
  
          const formato = { month: 'long' as const };
          const nombreMes = new Date(`${mes}-01`).toLocaleDateString('es-ES', formato);
  
          estadisticaMensual.push({ name: nombreMes, series: accionesTransformadas });
        }
      }
    }
  
    return estadisticaMensual;
  }
  
}
