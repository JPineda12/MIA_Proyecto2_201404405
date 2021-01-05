import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarRegaloPage } from './confirmar-regalo.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarRegaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarRegaloPageRoutingModule {}
