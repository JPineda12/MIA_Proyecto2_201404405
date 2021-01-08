import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepartirPageRoutingModule } from './repartir-routing.module';

import { RepartirPage } from './repartir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepartirPageRoutingModule
  ],
  declarations: [RepartirPage]
})
export class RepartirPageModule {}
