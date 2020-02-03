import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./pages/login/login.component"
import { ExtratoComponent } from "./pages/extrato/extrato.component"
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'extrato', component: ExtratoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
