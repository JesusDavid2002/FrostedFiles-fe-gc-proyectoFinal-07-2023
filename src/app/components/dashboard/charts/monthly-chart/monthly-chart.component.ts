import { Component } from '@angular/core';
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

  estadisticaMensual: any[] = [];
  mesActual: string = '';

  constructor(public graphicService: GraphicService) {}

  ngOnInit(): void {
    let fecha = new Date();
    let formato = {month: 'long' as const};
    this.mesActual = fecha.toLocaleDateString('es-ES', formato);

    this.graphicService.getMonthlyDataGraphic().subscribe(data => {
      if (typeof data === 'object') {
        let datosTransformados = this.extractData(data);
        let datosFiltrados = datosTransformados.filter(item => item.name === this.mesActual);
        
        if (datosFiltrados.length > 0) {
          const primerElemento = datosFiltrados[0];
          
          if (primerElemento.hasOwnProperty('series')) {
            const seriesDelMes = primerElemento.series;
            this.estadisticaMensual = seriesDelMes;

          } else {
            console.log('El primer elemento no tiene una propiedad "series" válida');
            this.estadisticaMensual = [];
          }

        } else {
          console.error('Los datos recibidos no son de un tipo válido.');
          this.estadisticaMensual = []; 
        }
      }
    });
  }

  extractData(data: any): any[] {
    const estadisticaMensual: any[] = [];

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
        
        estadisticaMensual.push({ name: mes, series: accionesTransformadas });
      }
    }

  return estadisticaMensual;
  }

}
