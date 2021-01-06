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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
