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
import { WelcomeComponent } from './components/welcome/welcome.component';

import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './session.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate : [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'about', component: AboutComponent, canActivate : [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard] },
  { path: 'home/details', component: DetailsComponent, canActivate : [AuthGuard] },
  { path: 'home/update-file', component: UpdateFileComponent, canActivate : [AuthGuard] },
  { path: 'home/upload-file', component: UploadFileComponent, canActivate : [AuthGuard] },
  { path: 'home/categories/:id', component: CategoriesComponent, canActivate : [AuthGuard] },
  { path: 'page404', component: Page404Component, canActivate : [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate : [AuthGuard] },
  { path: 'users-list', component: UsersListComponent, canActivate : [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/page404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
