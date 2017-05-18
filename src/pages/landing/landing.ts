import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthData } from '../../providers/auth-data';
import { Login} from '../login/login';
import { Signup } from '../signup/signup';
import { GooglePlus } from '@ionic-native/google-plus';
import { ProfileData } from '../../providers/profile-data';
import firebase from 'firebase';


/**
 * Generated class for the Landing page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class Landing {

  constructor(public navCtrl: NavController,
              public google: GooglePlus,
              public navParams: NavParams,
              public profileData: ProfileData,
    public authData: AuthData, public loadingCtrl: LoadingController) {
  }

  goToContent(){
    this.authData.noAccountLogin().then(()=>{
      loading.dismiss().then( () => {
        this.navCtrl.setRoot(HomePage);
      });

    });

    const loading = this.loadingCtrl.create();
    loading.present();
  }

  goToLogin(){
    this.navCtrl.push(Login);
  }

  guestlogin(){
    this.authData.noAccountLogin().then(()=>{
      loading.dismiss().then(()=>{
        this.navCtrl.setRoot(HomePage);
      });
    });

    const loading = this.loadingCtrl.create();
    loading.present();
  }

  goToSignUp(){
    this.navCtrl.push(Signup);
  }

  googleLogin(){
    this.google.login({
      'webClientId': '869006372877-11undik3vq1naui5naurbt4uf9nnmj43.apps.googleusercontent.com'
    }).then((res)=> {
      console.log(res);

      console.log(res.accessToken);

      console.log(typeof res.accessToken);

    }, (err)=> {
      console.log(err);
    })

  }

  googleLogout(){
    this.google.logout().then(()=>{
      console.log("logged out");
    });

  }

}
