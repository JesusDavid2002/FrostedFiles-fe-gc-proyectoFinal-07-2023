import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/home/details/details.component';
import { Page404Component } from './components/page404/page404.component';
import { UpdateFileComponent } from './components/home/update-file/update-file.component';
import { UploadFileComponent } from './components/home/upload-file/upload-file.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'dashboard', component: DashboardComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'home/details', component: DetailsComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'home/update-file', component: UpdateFileComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'home/upload-file', component: UploadFileComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'home/categories/:id', component: CategoriesComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'page404', component: Page404Component, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'user-profile', component: UserProfileComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: 'users-list', component: UsersListComponent, ...canActivate(() => redirectUnauthorizedTo(['auth/login']))},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/page404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
