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

  estadisticaMensual: any[] = [];
  mesActual: string = '';
  estadisticaGuardada: any[] = [];

  constructor(private graphicService: GraphicService) {}

  ngOnInit(): void {
    // let fecha = new Date();
    // let formato = {month: 'long' as const};
    // this.mesActual = fecha.toLocaleDateString('es-ES', formato);

    // this.graphicService.getMonthlyDataGraphic().subscribe(data => {
    //   if (typeof data === 'object') {
    //     // Si data es un objeto, extraer información directamente (ajusta esto según tu estructura de datos)
    //     this.estadisticaMensual = this.extractData(data);
    //     this.estadisticaMensual = this.estadisticaMensual.filter(item => item.mes === this.mesActual);
    //     this.estadisticaGuardada = this.estadisticaMensual;
        
    //   console.log(this.estadisticaMensual);
    //   } else {
    //     console.error('Los datos recibidos no son de un tipo válido.');
    //     this.estadisticaMensual = []; // O proporciona un valor predeterminado
    //   }
    //   console.log(data);
      
  // });
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
          accionesTransformadas.push({ tipoAccion, cantidad });
        }
      }

      estadisticaMensual.push({ mes, acciones: accionesTransformadas });
    }
  }

  return estadisticaMensual;
  }

  getData(){
    return this.graphicService.getMonthlyDataGraphic();
  }
}
