import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoreData } from '../../providers/store-data';
import { EmployeeDetail} from '../employee-detail/employee-detail'
import { StoreReview } from '../store-review/store-review'



/**
 * Generated class for the Store page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class Store {
  storeName: any;
  storeID: any;
  storeBanner: string = null;
  storeHours: any;
  storePic: any;
  public eventList: Array<any>;
  public storeMenu: Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storeData: StoreData) {
  }

  ionViewDidEnter() {
    this.storeName = this.navParams.get('storeName');
    this.storeID = this.navParams.get('storeID');

    this.storeData.getStoreBanner(this.storeID).then(bannerSnap => {
      this.storePic = bannerSnap;
      console.log(this.storePic);
    });
    this.storeData.getStoreEmployees(this.storeID).then(eventListSnap => {
      this.eventList = eventListSnap;
    });
    this.storeData.getHours(this.storeID).then(storeHours => {
      this.storeHours = storeHours;
    });
    this.storeData.getMenu(this.storeID).then(menuSnap =>{
      this.storeMenu = menuSnap;
    });
  }


  goToEmployeeDetail(employeeID: any){
    this.navCtrl.push(EmployeeDetail, {'employeeID': employeeID});
  }

  readReview(storeID: any){
    this.navCtrl.push(StoreReview, {'storeID': this.storeID});
  }

}
