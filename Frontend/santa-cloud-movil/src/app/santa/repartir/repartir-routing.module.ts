import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepartirPage } from './repartir.page';

const routes: Routes = [
  {
    path: '',
    component: RepartirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepartirPageRoutingModule {}
