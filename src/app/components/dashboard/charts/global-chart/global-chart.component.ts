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
  
  estadisticaAnuales: any[] = [];
  mesActual: string = '';

  constructor(private graphicService: GraphicService) {}

  ngOnInit(): void {
    let fecha = new Date();
    let formato = {month: 'long' as const};
    this.mesActual = fecha.toLocaleDateString('es-ES', formato);

    this.graphicService.getMonthlyDataGraphic().subscribe(data => {
      if (typeof data === 'object') {
        let datosTransformados = this.extractData(data);
        let datosFiltrados = datosTransformados;
        
        if (datosFiltrados.length > 0) {
            this.estadisticaAnuales = datosFiltrados;

          } else {
            console.log('El primer elemento no tiene una propiedad "series" válida');
            this.estadisticaAnuales = [];
          }

        } else {
          console.error('Los datos recibidos no son de un tipo válido.');
          this.estadisticaAnuales = []; 
        }
      });
  }

  extractData(data: any): any[] {
    const estadisticaAnuales: any[] = [];

    for (const mes in data) {
      if (data.hasOwnProperty(mes)) {
        const accionesPorMes = data[mes];
        const accionesTransformadas = [];

        for (const tipoAccion in accionesPorMes) {
          if (accionesPorMes.hasOwnProperty(tipoAccion)) {
            const cantidad = accionesPorMes[tipoAccion];
            accionesTransformadas.push({ name: tipoAccion, value: cantidad });
          }
        }
        
        estadisticaAnuales.push({ name: mes, series: accionesTransformadas });
      }
    }

  return estadisticaAnuales;
  }


  // getData(){
  //   return this.graphicService.getGlobalDataGraphic();
  // }

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
