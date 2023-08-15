import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  menuBtnActive: boolean = false;
  searchFormActive: boolean = false;
  profileWindowActive: boolean = false;

  constructor(private userService: UserService, private router: Router) {}
  
  onClick(){
    this.userService.logout()
    .then((res) => {
      console.log(res);
      this.router.navigate(['/welcome']);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  toggleMenu(): void {
    this.menuBtnActive = !this.menuBtnActive;
  }

  toggleSearchForm(): void {
    this.searchFormActive = !this.searchFormActive;
  }
  cancelSearch(): void {
    this.searchFormActive = false;
  }

  toggleProfileWindow(): void {
    this.profileWindowActive = !this.profileWindowActive;
  }
}
