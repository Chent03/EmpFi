import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Store } from './store';

@NgModule({
  declarations: [
    Store,
  ],
  imports: [
    IonicPageModule.forChild(Store),
  ],
  exports: [
    Store
  ]
})
export class StoreModule {}
