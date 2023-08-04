import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() dataCategoriesUpload: Array<any> = [];

  constructor(private router: Router) {}

  ngOnInit(): void{}

  navigateDetails() {
    this.router.navigate(['home/details']);
  }

  details(){}
}
