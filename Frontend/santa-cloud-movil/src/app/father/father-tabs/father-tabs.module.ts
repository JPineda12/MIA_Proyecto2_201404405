import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FatherTabsPageRoutingModule } from './father-tabs-routing.module';

import { FatherTabsPage } from './father-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FatherTabsPageRoutingModule
  ],
  declarations: [FatherTabsPage]
})
export class FatherTabsPageModule {}
