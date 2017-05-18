import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { StoreData } from '../../providers/store-data';
import { EmployeeDetail} from '../employee-detail/employee-detail'
import firebase from 'firebase';
import {ProfileData} from "../../providers/profile-data";
import { StoreHours } from '../store-hours/store-hours';

/**
 * Generated class for the MyStore page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-store',
  templateUrl: 'my-store.html',
})
export class MyStore {
  Banner: "assets/img/stagpic.jpg";
  storeBanner: string = null;
  storePic: any;
  storeHours: any;

  public eventList: Array<any>;
  public menuList: Array<any>;

  public head = [];

  constructor(public navCtrl: NavController,
              public storeData: StoreData, public profileData: ProfileData,
              public camera: Camera, public alrtCtrl: AlertController) {
  }

  ionViewDidEnter(){
    this.storeData.getBanner().then(bannerSnap => {
      this.storePic = bannerSnap;
      console.log(this.storePic);
    });
    this.storeData.getEmployees().then(eventListSnap => {
      this.eventList = eventListSnap;
      console.log(this.eventList);
      this.something(this.eventList);
    });

    this.storeData.getStoreHours().then(storeHours => {
      this.storeHours = storeHours;
    });
    this.storeData.getStoreMenu().then(menuListSnap =>{
      this.menuList = menuListSnap;
    })
  }

  something(thelist: any){
    for(let item of thelist){
      this.profileData.getEmployeeProfilePicture(item.name).then((pictureSnap) =>{
        console.log(pictureSnap);
        this.head.push(pictureSnap);
      })
    }
  }

  takePicture(){
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
    }).then(imageData => {
      this.storeBanner = imageData;
      this.storeData.addBanner(this.storeBanner).then(() => {
        this.storeBanner = null;
        this.navCtrl.setRoot(MyStore);

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
      this.storeBanner = imageData;
      this.storeData.addBanner(this.storeBanner).then(() => {
        this.storeBanner = null;
        this.navCtrl.setRoot(MyStore);

      });
    }, error => {
      console.log("ERROR AT CAMERA FUNCTION : " + JSON.stringify(error));
    });
  }



  addEmployees(){
    let prompt = this.alrtCtrl.create({
      title: 'Add Employee',
      message: "Please enter employee's username: ",
      inputs: [
        {
          name: 'username',
          placeholder: 'Employee Username'
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
            console.log(data.username);
            this.storeData.getEmployeeID(data.username).then(snap => {
              let employeeID = snap;
              this.storeData.addEmployeeID(employeeID.userID);
              this.navCtrl.setRoot(MyStore);
            })

          }
        }
      ]
    });
    prompt.present();
  }

  goToEmployeeDetail(employeeID: any){
    this.navCtrl.push(EmployeeDetail, {'employeeID': employeeID});
  }

  editStoreHours(){
    this.navCtrl.push(StoreHours);
  }

  addMenuItem(){
    let prompt = this.alrtCtrl.create({
      title: 'Add Item',
      message: "What's on the menu? ",
      inputs: [
        {
          name: 'itemName',
          placeholder: 'Menu Item'
        },
        {
          name: 'itemPrice',
          placeholder: 'Menu Price'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            this.storeData.addMenuItem(data.itemName, data.itemPrice).then(()=>{
              this.navCtrl.setRoot(MyStore);
              //   window.location.reload()
                // location.reload();
              }
            )
          }
        }
      ]
    });
    prompt.present();
  }

  removeItem(e, keyId: any){
    console.log(keyId)
    this.storeData.removeItem(keyId).then(()=>{
      this.navCtrl.setRoot(MyStore);
    });
  }



}
