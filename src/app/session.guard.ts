// import { CanActivateFn } from '@angular/router';

// export const sessionGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';



// @Injectable({
//   providedIn: 'root'  // or another module if you want to scope it differently
// })
// export class sessionGuard implements CanActivate {

//   constructor(private _router: Router, private userService: UserService) {
//   }

//   canActivate(route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {

//     //check some condition  
//     if (this.userService.getToken() == null) {
//       alert('You are not allowed to view this page');
//       //redirect to login/home page etc
//       //return false to cancel the navigation
//       return false;
//     }
//     return true;
//   }

// }

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.userService.getToken(); // tu lógica personalizada aquí
    if (!isAuthenticated) {
      this.router.navigate(['login']); // o tu ruta de inicio de sesión
      return false;
    }
    return true;
  }
}