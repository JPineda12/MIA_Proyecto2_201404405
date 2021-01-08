import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleEntregaPageRoutingModule } from './detalle-entrega-routing.module';

import { DetalleEntregaPage } from './detalle-entrega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleEntregaPageRoutingModule
  ],
  declarations: [DetalleEntregaPage]
})
export class DetalleEntregaPageModule {}
