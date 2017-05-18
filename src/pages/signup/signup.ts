import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {
  registerForm: any;
  loading: any;
  constructor(public navCtrl: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public alrtCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.registerForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }


  signupUser(){
    if(!this.registerForm.valid){
      console.log("Missing Fields", this.registerForm.value);
    }else {
      this.authData.signupUser(this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.username,
        this.registerForm.value.email,
        this.registerForm.value.phone,
        this.registerForm.value.password).then(()=>{
          this.loading.dismiss().then(()=>{
            this.navCtrl.setRoot(HomePage);
          });
      }, (error) => {
          this.loading.dismiss().then(()=> {
            let errorMessage: string = error.message;
            let alert = this.alrtCtrl.create({
              message: errorMessage,
              buttons: [
                {
                text: "Ok",
                role: 'cancel'
              }]
            });
            alert.present();
          });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

}
