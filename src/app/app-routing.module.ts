import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AuthCheck } from './auth/auth-check';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthCheck],
    component: MainComponent,
    // children: [
    //   {
    //     path: "everywhere-ive-been"
    //     component: 
    //   }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
