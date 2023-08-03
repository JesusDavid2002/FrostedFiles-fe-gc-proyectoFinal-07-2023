import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public categoriesList: Array<any> = [];

  constructor(private router: Router) {}

  ngOnInit(): void{
    this.categoriesList= [
      {
        name:'Categoria 1'
      }, 
      {
        name: 'Categoria 2'
      }
    ];
  }

  navigateDetails() {
    this.router.navigate(['home/details']);
  }

  details(){}
}
