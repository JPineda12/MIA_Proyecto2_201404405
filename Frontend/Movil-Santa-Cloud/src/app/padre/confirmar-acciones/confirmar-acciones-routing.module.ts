import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarAccionesPage } from './confirmar-acciones.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarAccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarAccionesPageRoutingModule {}
