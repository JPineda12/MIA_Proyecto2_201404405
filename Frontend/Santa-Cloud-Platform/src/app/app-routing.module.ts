import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/home/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component'
import { KidComponent} from './components/home/kid/kid.component';
import { ElfoComponent} from './components/home/elfo/elfo.component'
import { PadreComponent} from './components/home/padre/padre.component'
import { CRUDAccionesComponent} from './components/admin/crudacciones/crudacciones.component'
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
    path: 'padre',
    component: PadreComponent,
  },
  { 
    path: 'kid',
    component: KidComponent,
  },
  { 
    path: 'elfo',
    component: ElfoComponent,
  },
  { 
    path: 'adminacciones',
    component: CRUDAccionesComponent,
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