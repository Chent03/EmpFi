import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RegisterStore } from '../pages/register-store/register-store';

import { AngularFire } from 'angularfire2';
import { Landing } from '../pages/landing/landing';
import { AuthData } from '../providers/auth-data';
import { Profile } from '../pages/profile/profile';
import { ProfileData } from '../providers/profile-data';
import { Explore } from '../pages/explore/explore';
import firebase from 'firebase';


//need to remove
import { MyStore } from '../pages/my-store/my-store';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  public userProfile: any;
  public anonymous= false;
  public userName: any;
  profileList: any;
  anonymouspages: Array<{title: string, component: any}>;
  public proPic: any;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public proData: ProfileData,
              public authData: AuthData, public af: AngularFire,
              public statusBar: StatusBar, public splashScreen: SplashScreen) {
    const authListener = af.auth.subscribe((user) =>{
      if(user){
        this.rootPage = HomePage;
        this.proData.getProfilePicture().then(pictureSnap => {
          this.proPic = pictureSnap;
        });
        authListener.unsubscribe();
      }else{
        this.rootPage = Landing;
        authListener.unsubscribe();
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Map', component: HomePage },
      { title: 'My Profile', component: Profile},
      { title: 'My Store', component: MyStore},
      { title: "Explore ", component: Explore},
      { title: 'Register Store', component: RegisterStore}
    ];

    this.anonymouspages = [
      {title: "Map", component: HomePage}]

  }
  ionViewDidEnter() {
    console.log(this.anonymous);
    this.proData.getProfilePicture().then(pictureSnap => {
      this.proPic = pictureSnap;
      console.log(this.anonymous);

    });
  }



  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logoutUser(){
    this.proData.logoutUser().then(()=>{
      this.nav.setRoot(Landing);
    })
  }

  isAnonymous(){
    if(this.authData.getStatus().isAnonymous() == true){
      this.anonymous = true;
      console.log(this.anonymous);
    }else {
      this.anonymous = false;
      console.log(this.anonymous);
    }
  }


}
