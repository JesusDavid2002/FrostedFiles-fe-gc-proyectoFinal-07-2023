import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GlobalChartComponent } from './charts/global-chart/global-chart.component';
import { MonthlyChartComponent } from './charts/monthly-chart/monthly-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  cards: any[]=[
    {id: 'cd-global', title: 'Global Chart', chartComponent: GlobalChartComponent},
    {id: 'cd-month', title: 'Month Chart', chartComponent: MonthlyChartComponent}
  ];

  onHide(index: number){
    this.cards.splice(index, 1)
  }
  
  onShow(){
    let newCard = {id: 'cd-month', title: 'Month Chart', chartComponent: MonthlyChartComponent}
    this.cards.push(newCard);
  }

  onShowGlobal(){
    let newCard = {id: 'cd-global', title: 'Global Chart', chartComponent: GlobalChartComponent}
    this.cards.push(newCard);
  }

  drop(event: CdkDragDrop<any[]>){
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }
}
