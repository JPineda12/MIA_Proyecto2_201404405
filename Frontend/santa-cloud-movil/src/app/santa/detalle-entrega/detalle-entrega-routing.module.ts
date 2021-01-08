import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleEntregaPage } from './detalle-entrega.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleEntregaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleEntregaPageRoutingModule {}
