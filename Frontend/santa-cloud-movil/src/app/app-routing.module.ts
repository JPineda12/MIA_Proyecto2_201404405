import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'father-tabs',
    loadChildren: () => import('./father/father-tabs/father-tabs.module').then( m => m.FatherTabsPageModule)
  },
  {
    path: 'santa-tabs',
    loadChildren: () => import('./santa/santa-tabs/santa-tabs.module').then( m => m.SantaTabsPageModule)
  },
  {
    path: 'detalle-carta',
    loadChildren: () => import('./father/detalle-carta/detalle-carta.module').then( m => m.DetalleCartaPageModule)
  },
  {
    path: 'editar-perfil-hijo',
    loadChildren: () => import('./father/editar-perfil-hijo/editar-perfil-hijo.module').then( m => m.EditarPerfilHijoPageModule)
  },
  {
    path: 'ver-mensajes',
    loadChildren: () => import('./father/ver-mensajes/ver-mensajes.module').then( m => m.VerMensajesPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
