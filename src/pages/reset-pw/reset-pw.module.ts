import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetPw } from './reset-pw';

@NgModule({
  declarations: [
    ResetPw,
  ],
  imports: [
    IonicPageModule.forChild(ResetPw),
  ],
  exports: [
    ResetPw
  ]
})
export class ResetPwModule {}
