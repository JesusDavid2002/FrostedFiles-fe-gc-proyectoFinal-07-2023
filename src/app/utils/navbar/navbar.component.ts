import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        opacity: 1,
        height: '*',
        visibility: 'visible',
      })),
      state('closed', style({
        opacity: 0,
        height: '0',
        visibility: 'hidden',
      })),
      transition('closed <=> open', [
        animate('0.6s linear'),
      ]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  menuBtnActive: boolean = false;
  searchFormActive: boolean = false;
  profileWindowActive: boolean = false;
  usuario: any = {};
  userRole: string | null = null;

  constructor(private userService: UserService, private router: Router) {}
  
  onClick() {
    this.userService.logout();
    this.router.navigate(['/welcome']);
  }

  ngOnInit(): void {
    let userEmail = this.userService.getUserEmail();
    if (userEmail !== null && userEmail !== undefined) {
      this.userService.getUserDetailsByEmail(userEmail).subscribe((data: any) => {
        this.usuario = data;
        this.userRole = this.usuario.roles.nombre;
      });
    }
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
