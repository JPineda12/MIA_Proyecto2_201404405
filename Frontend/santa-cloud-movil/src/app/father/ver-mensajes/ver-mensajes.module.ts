import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerMensajesPageRoutingModule } from './ver-mensajes-routing.module';

import { VerMensajesPage } from './ver-mensajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerMensajesPageRoutingModule
  ],
  declarations: [VerMensajesPage]
})
export class VerMensajesPageModule {}
