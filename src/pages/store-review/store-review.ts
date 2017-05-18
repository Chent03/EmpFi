import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StoreData} from "../../providers/store-data";
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';


/**
 * Generated class for the StoreReview page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-store-review',
  templateUrl: 'store-review.html',
})
export class StoreReview {
  reviewStoreForm: any;
  storeID: any;
  public eventList: Array<any>;



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public storeData: StoreData) {

    this.reviewStoreForm = formBuilder.group({
      review: ['', Validators.compose([Validators.required])]
    })
  }

  ionViewDidEnter() {
    this.storeData.getReviews(this.navParams.get('storeID')).then(eventListSnap => {
      this.eventList = eventListSnap;
      console.log(this.eventList);
      this.storeID = this.navParams.get('storeID');
      console.log("STORE ID: " + this.storeID);
    });

  }


  writeStoreReview(){
    if(!this.reviewStoreForm.valid){
      console.log(this.reviewStoreForm)
    }else{
      this.storeData.writeReview(this.storeID, this.reviewStoreForm.value.review, firebase.auth().currentUser.uid)
    }
    this.reviewStoreForm.reset();
    this.navCtrl.pop();

  }

}
