import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthCheck } from './auth/auth-check';
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
        loadChildren: () => import('./everywhere-ive-been/everywhere-ive-been.module').then(m => m.EverywhereIveBeenModule)
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
