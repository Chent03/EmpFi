import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StoreData } from '../../providers/store-data';

/**
 * Generated class for the StoreHours page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-store-hours',
  templateUrl: 'store-hours.html',
})
export class StoreHours {
  registerHourForm: any;
  public day: any;
  public open: any;
  public closing: any;


  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public storeData: StoreData) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreHours');
  }
  registerHours(){
    this.storeData.setStoreHours(this.day, this.open, this.closing).then(() =>{
      this.presentToast();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Success',
      duration: 3000
    });
    toast.present();
  }

}


