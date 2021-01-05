import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarAccionesPageRoutingModule } from './confirmar-acciones-routing.module';

import { ConfirmarAccionesPage } from './confirmar-acciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarAccionesPageRoutingModule
  ],
  declarations: [ConfirmarAccionesPage]
})
export class ConfirmarAccionesPageModule {}
