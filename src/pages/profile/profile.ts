import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  public userProfile: any;
  public userName : string;
  public profilePic: null;
  public proPic: any;
  public bio: any;
  randomID: any;
  public eventList: Array<any>;

  constructor(public navCtrl: NavController,
              public alrtCtrl: AlertController,
              public profileData: ProfileData, public camera: Camera) {

  }



  ionViewDidEnter(){
    this.profileData.getProfilePicture().then(pictureSnap => {
      this.proPic = pictureSnap;
    });
    this.profileData.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      this.userName = this.userProfile.firstName;
      console.log(this.userName)
    });
    this.profileData.getContent().then(eventListSnap => {
      this.eventList = eventListSnap;
    });
    this.profileData.getBio().then(bio => {
      this.bio = bio;
    });
  }

  takeProfilePicture(){
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false,
    }).then(imageData => {
      this.profilePic = imageData;
      this.profileData.addProfilePicture(this.profilePic).then(() => {
        this.profilePic = null;
        this.navCtrl.setRoot(Profile);
      });
    }, error => {
      console.log("ERROR AT CAMERA FUNCTION : " + JSON.stringify(error));
    });
  }

  uploadPicture(){
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false,
    }).then(imageData => {
      this.profilePic = imageData;
      this.profileData.addPictures(this.profilePic).then(() => {
        this.profilePic = null;
        this.navCtrl.setRoot(Profile);
      });
    }, error => {
      console.log("ERROR AT CAMERA FUNCTION : " + JSON.stringify(error));
    });
  }

  uploadPictures(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i =0; i< 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.randomID = text;
    console.log(this.randomID + '.png');
  }

  addBio(){
    let prompt = this.alrtCtrl.create({
      title: 'Add Bio',
      message: "Please enter a description of yourself: ",
      inputs: [
        {
          name: 'bio',
          placeholder: 'Your Bio'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            console.log(data.bio);
            this.profileData.addBio(data.bio)
            this.navCtrl.setRoot(Profile);
          }
        }
      ]
    });
    prompt.present();
  }


}
