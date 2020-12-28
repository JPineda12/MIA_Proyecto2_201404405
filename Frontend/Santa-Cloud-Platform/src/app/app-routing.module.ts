import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/home/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component'
const routes: Routes = [
  { 
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  { 
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: 'admin',
    component: AdminComponent,
  },
  { 
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    redirectTo: "/login",
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
