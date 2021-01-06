import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilHijoPage } from './editar-perfil-hijo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilHijoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilHijoPageRoutingModule {}
