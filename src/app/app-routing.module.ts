import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthCheck } from './auth/auth-check';
import { MapComponent } from './map/map.component';
import { ContentComponent } from './layouts/content/content.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthCheck],
    component: ContentComponent,
    children: [
      {
        path: 'everywhere-ive-been',
        component: MapComponent
      }
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
