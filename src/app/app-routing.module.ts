import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/home/details/details.component';
import { Page404Component } from './components/page404/page404.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { UpdateFileComponent } from './components/home/update-file/update-file.component';
import { UploadFileComponent } from './components/home/upload-file/upload-file.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: 'components/home', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'components/about', component: AboutComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/dashboard', component: DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/home/details', component: DetailsComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/home/update-file', component: UpdateFileComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/home/upload-file', component: UploadFileComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/page404', component: Page404Component, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/user-profile', component: UserProfileComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'components/users-list', component: UsersListComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'utils/navbar', component: NavbarComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: '', redirectTo: '/components/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/components/page404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
