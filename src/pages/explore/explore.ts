import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { EmployeeDetail } from '../employee-detail/employee-detail';


/**
 * Generated class for the Explore page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class Explore {
  public exploreContent: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidEnter() {
    this.getExplorer().then(contentSnap =>{
      this.exploreContent = contentSnap;
    });

  }

  getExplorer():Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/explore')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              id: snap.val().id,
              content: snap.val().content,
              user: snap.val().user
            });
            return false
          });
          resolve(rawList);
        });
    });
  }
  goToEmployeeDetail(employeeID: any){
    this.navCtrl.push(EmployeeDetail, {'employeeID': employeeID});
  }

}
