import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilHijoPage } from './perfil-hijo.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilHijoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilHijoPageRoutingModule {}
