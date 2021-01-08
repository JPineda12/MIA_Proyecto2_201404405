import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCartaPageRoutingModule } from './detalle-carta-routing.module';

import { DetalleCartaPage } from './detalle-carta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCartaPageRoutingModule
  ],
  declarations: [DetalleCartaPage]
})
export class DetalleCartaPageModule {}
