import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreReview } from './store-review';

@NgModule({
  declarations: [
    StoreReview,
  ],
  imports: [
    IonicPageModule.forChild(StoreReview),
  ],
  exports: [
    StoreReview
  ]
})
export class StoreReviewModule {}
