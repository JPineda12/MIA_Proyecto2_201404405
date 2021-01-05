import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SantaTabsPageRoutingModule } from './santa-tabs-routing.module';

import { SantaTabsPage } from './santa-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SantaTabsPageRoutingModule
  ],
  declarations: [SantaTabsPage]
})
export class SantaTabsPageModule {}
