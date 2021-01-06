import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilHijoPageRoutingModule } from './editar-perfil-hijo-routing.module';

import { EditarPerfilHijoPage } from './editar-perfil-hijo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilHijoPageRoutingModule
  ],
  declarations: [EditarPerfilHijoPage]
})
export class EditarPerfilHijoPageModule {}
