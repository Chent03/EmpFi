import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterStore } from './register-store';

@NgModule({
  declarations: [
    RegisterStore,
  ],
  imports: [
    IonicPageModule.forChild(RegisterStore),
  ],
  exports: [
    RegisterStore
  ]
})
export class RegisterStoreModule {}
