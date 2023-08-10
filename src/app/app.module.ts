import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './utils/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { Page404Component } from './components/page404/page404.component';
import { DetailsComponent } from './components/home/details/details.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UpdateFileComponent } from './components/home/update-file/update-file.component';
import { UploadFileComponent } from './components/home/upload-file/upload-file.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GlobalChartComponent } from './components/dashboard/charts/global-chart/global-chart.component';
import { MonthlyChartComponent } from './components/dashboard/charts/monthly-chart/monthly-chart.component';
import { CompartirComponent } from './components/home/details/compartir/compartir.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HttpClientModule } from'@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PermissionsComponent } from './components/home/permissions/permissions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    Page404Component,
    UpdateFileComponent,
    UploadFileComponent,
    DetailsComponent,
    UserProfileComponent,
    UsersListComponent,
    CategoriesComponent,
    DashboardComponent,
    GlobalChartComponent,
    MonthlyChartComponent,
    CompartirComponent,
    PermissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    NgxChartsModule,
    NgbModule,
    DragDropModule
  ],
  exports: [NavbarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
