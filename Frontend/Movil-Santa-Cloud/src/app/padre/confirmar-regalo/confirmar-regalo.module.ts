import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarRegaloPageRoutingModule } from './confirmar-regalo-routing.module';

import { ConfirmarRegaloPage } from './confirmar-regalo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarRegaloPageRoutingModule
  ],
  declarations: [ConfirmarRegaloPage]
})
export class ConfirmarRegaloPageModule {}
