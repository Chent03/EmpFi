import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { FormBuilder, Validators } from '@angular/forms';
import firebase from 'firebase';



/**
 * Generated class for the Reviews page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class Reviews {
  reviewID: any;
  reviewForm: any;
  public proPic: any;
  employeeID: any;
  public eventList: Array<any>;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder,
              public navParams: NavParams, public profileData: ProfileData) {

    this.employeeID = this.navParams.get('employeeID');

    this.reviewForm = formBuilder.group({
      review: ['', Validators.compose([Validators.required])]
    })
  }

  ionViewDidEnter() {
    this.profileData.getEmployeeData(this.employeeID).then(profilesnap=>{
      this.reviewID = profilesnap;
    });
    this.profileData.getEmployeeProfilePicture(this.employeeID).then(pictureSnap => {
      this.proPic = pictureSnap;
    });
    this.profileData.getReviews(this.employeeID).then(eventListSnap => {
      this.eventList = eventListSnap;
      console.log(this.eventList);
    });
  }


  writeReview(){
    if(!this.reviewForm.valid){
      console.log(this.reviewForm)
    }else{
      this.profileData.writeReview(this.employeeID, this.reviewForm.value.review, firebase.auth().currentUser.uid).then(()=>{
        // this.navCtrl.setRoot(Reviews);
      })
    }
    this.navCtrl.pop();
  }

}
