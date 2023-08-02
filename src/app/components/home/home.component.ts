import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private userService: UserService, private router: Router) {}
  onClick(){
    this.userService.logout()
    .then((res) => {
      console.log(res);
      this.router.navigate(['auth/login']);
    }).catch((err) => {
      console.log(err);
    });
  }
}
