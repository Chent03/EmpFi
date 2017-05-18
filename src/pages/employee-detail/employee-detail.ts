import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { Reviews } from '../reviews/reviews';
import { SMS } from '@ionic-native/sms';



@IonicPage()
@Component({
  selector: 'page-employee-detail',
  templateUrl: 'employee-detail.html',
})
export class EmployeeDetail {
  public currentEmployee: any;
  public employeeID: any;
  public eventList: Array<any>;
  public proPic: any;
  public bio: any;

  constructor(public navCtrl: NavController,
              private sms: SMS,
              public navParams: NavParams, public profileData: ProfileData) {

  }

  ionViewDidEnter(){
    this.employeeID = this.navParams.get('employeeID');
    this.profileData.getEmployeeData(this.navParams.get('employeeID')).then(profilesnap=>{
      this.currentEmployee = profilesnap;
      console.log(this.currentEmployee.email);
    });

    this.profileData.getEmployeeProfilePicture(this.employeeID).then(pictureSnap => {
      this.proPic = pictureSnap;
    });
    this.profileData.getEmployeeContent(this.employeeID).then(eventListSnap => {
      this.eventList = eventListSnap;
    });
    this.profileData.getUserBio(this.navParams.get('employeeID')).then(bio => {
      this.bio = bio;
    })



  }
  readReview(employeeID: any){
    this.navCtrl.push(Reviews, {'employeeID': employeeID})
  }

  sendSMS(){
    var options={
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    };
    this.sms.send('6465731388',' Hello', options).then(()=>{
      alert("success");
    }, () =>{
      alert("failed");
    });
  }




}
