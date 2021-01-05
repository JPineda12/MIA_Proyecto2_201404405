import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'confirmar-acciones',
        loadChildren: () => import('../confirmar-acciones/confirmar-acciones.module').then( m => m.ConfirmarAccionesPageModule)
      },
      {
        path: 'confirmar-regalos',
        children: [
          {
            path: '',
            loadChildren: () => import('../confirmar-regalo/confirmar-regalo.module').then( m => m.ConfirmarRegaloPageModule)
          }
        ]
      },
      {
        path: 'perfil-hijo',
        children: [
          {
            path: '',
            loadChildren: () => import('../perfil-hijo/perfil-hijo.module').then( m => m.PerfilHijoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/confirmar-acciones',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/confirmar-acciones',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
