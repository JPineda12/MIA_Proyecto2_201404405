import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCartaPage } from './detalle-carta.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCartaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCartaPageRoutingModule {}
