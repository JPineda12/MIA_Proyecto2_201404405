import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SantaTabsPage } from './santa-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: SantaTabsPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('../../santa/perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'repartir',
        loadChildren: () => import('../../santa/repartir/repartir.module').then(m => m.RepartirPageModule)
      },
      {
        path: '',
        redirectTo: '/santa-tabs/perfil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/santa-tabs/perfil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SantaTabsPageRoutingModule {}
