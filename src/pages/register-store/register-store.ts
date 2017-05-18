import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { StoreData } from '../../providers/store-data';
import { GeocodeService } from '../../providers/geocode-service';


/**
 * Generated class for the RegisterStore page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-store',
  templateUrl: 'register-store.html',
})
export class RegisterStore {
  registerStoreForm: any;
  loading: any;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public http: Http,
    public geo : GeocodeService,
    public alrtController: AlertController, public storeData: StoreData, public loadingController: LoadingController) {

    this.registerStoreForm = formBuilder.group({
      storeName: ['', Validators.compose([Validators.required, Validators.maxLength(80)])],
      storeAddress: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      storeCity: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      storeState: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      storeZip: ['', Validators.compose([Validators.required, Validators.maxLength(5)])]
    })
  }


  registerStore(){
    if(!this.registerStoreForm.valid){
      console.log(this.registerStoreForm.value);
    }else{
      this.geo.getLatLong(this.registerStoreForm.value.storeAddress, this.registerStoreForm.value.storeCity, this.registerStoreForm.value.storeState).then(res => {
        let longitude = res.location.longitude;
        let latitude = res.location.latitude;
        this.storeData.registerGeo(latitude, longitude);
        console.log(latitude + ', ' + longitude);
        this.storeData.registerStore(latitude, longitude,this.registerStoreForm.value.storeName,
          this.registerStoreForm.value.storeAddress,
          this.registerStoreForm.value.storeCity,
          this.registerStoreForm.value.storeState,
          this.registerStoreForm.value.storeZip).then(()=>{
          // this.navCtrl.pop();
          console.log("Logged");
          this.storeData.setInitialHours();

        }, error => {
          console.log(error);
        });
        this.registerStoreForm.reset();
      });





      // this.storeData.registerStore(this.registerStoreForm.value.storeName,
      //   this.registerStoreForm.value.storeAddress,
      //   this.registerStoreForm.value.storeCity,
      //   this.registerStoreForm.value.storeState,
      //   this.registerStoreForm.value.storeZip).then(()=>{
      //   // this.navCtrl.pop();
      //   console.log("Logged");
      // }, error => {
      //   console.log(error);
      // });
    }
  }

}
