import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilHijoPageRoutingModule } from './perfil-hijo-routing.module';

import { PerfilHijoPage } from './perfil-hijo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilHijoPageRoutingModule
  ],
  declarations: [PerfilHijoPage]
})
export class PerfilHijoPageModule {}
