import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreHours } from './store-hours';

@NgModule({
  declarations: [
    StoreHours,
  ],
  imports: [
    IonicPageModule.forChild(StoreHours),
  ],
  exports: [
    StoreHours
  ]
})
export class StoreHoursModule {}
