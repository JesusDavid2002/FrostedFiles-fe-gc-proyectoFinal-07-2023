import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/home/details/details.component';
import { UploadFileComponent } from './components/home/upload-file/upload-file.component';
import { UpdateFileComponent } from './components/home/update-file/update-file.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'upload-files',
    component: UploadFileComponent
  },
  {
    path: 'update-files',
    component: UpdateFileComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
