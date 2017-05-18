import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController} from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators} from '@angular/forms';
import { ResetPw } from '../../pages/reset-pw/reset-pw'
import {HomePage} from "../home/home";


/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  loginForm: any;
  loading: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder, public alrtCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password:['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  goResetPassword(){
    this.navCtrl.push(ResetPw);
  }

  loginUser(){
    if(!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email,
        this.loginForm.value.password).then(()=> {
          this.loading.dismiss().then(()=>{
            this.navCtrl.setRoot(HomePage);
          });
      }, error => {
        this.loading.dismiss().then(()=>{
          let alert = this.alrtCtrl.create({
            message: error.message,
            buttons: [
              {
                text:'Ok',
                role:'cancel'
              }
            ]
          });
          alert.present()
        });
      }) ;

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
