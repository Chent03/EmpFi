import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController} from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the ResetPw page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reset-pw',
  templateUrl: 'reset-pw.html',
})
export class ResetPw {
  resetPwForm: any;


  constructor(public navCtrl: NavController, public alrtCtrl: AlertController, public formBuilder: FormBuilder,
    public authData: AuthData) {

    this.resetPwForm = formBuilder.group({
      email: ['', Validators.required]
    });

  }



}
