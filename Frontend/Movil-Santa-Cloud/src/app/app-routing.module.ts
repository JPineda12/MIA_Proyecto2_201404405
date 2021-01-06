import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./padre/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'santa-tabs',
    loadChildren: () => import('./santa/santa-tabs/santa-tabs.module').then( m => m.SantaTabsPageModule)
  },
  {
    path: 'detalle-carta',
    loadChildren: () => import('./padre/detalle-carta/detalle-carta.module').then( m => m.DetalleCartaPageModule)
  },
  {
    path: 'editar-perfil-hijo',
    loadChildren: () => import('./padre/editar-perfil-hijo/editar-perfil-hijo.module').then( m => m.EditarPerfilHijoPageModule)
  },
  {
    path: 'ver-mensajes',
    loadChildren: () => import('./padre/ver-mensajes/ver-mensajes.module').then( m => m.VerMensajesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
