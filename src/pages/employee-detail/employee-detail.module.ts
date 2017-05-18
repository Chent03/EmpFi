import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeDetail } from './employee-detail';

@NgModule({
  declarations: [
    EmployeeDetail,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeDetail),
  ],
  exports: [
    EmployeeDetail
  ]
})
export class EmployeeDetailModule {}
