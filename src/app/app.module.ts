import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';


//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Landing } from '../pages/landing/landing';
import { Profile } from '../pages/profile/profile';
import { ResetPw } from '../pages/reset-pw/reset-pw';
import { MyStore }  from '../pages/my-store/my-store';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { RegisterStore} from '../pages/register-store/register-store';
import { EmployeeDetail } from '../pages/employee-detail/employee-detail';
import { Store } from '../pages/store/store';
import { Reviews } from '../pages/reviews/reviews';
import { StoreReview } from '../pages/store-review/store-review';
import { StoreHours } from '../pages/store-hours/store-hours';
import { Explore } from '../pages/explore/explore'

//Providers
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { StoreData } from '../providers/store-data';
import { GeocodeService } from '../providers/geocode-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { SMS } from '@ionic-native/sms';
import { GooglePlus } from '@ionic-native/google-plus';



export const config = {
  apiKey: "INSERT YOUR APIKEY",
  authDomain: "cs639firebase-a59a5.firebaseapp.com",
  databaseURL: "https://cs639firebase-a59a5.firebaseio.com",
  projectId: "cs639firebase-a59a5",
  storageBucket: "cs639firebase-a59a5.appspot.com",
  messagingSenderId: "869006372877"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Landing,
    Profile,
    ResetPw,
    Login,
    Signup,
    MyStore,
    RegisterStore,
    EmployeeDetail,
    Store,
    Reviews,
    StoreReview,
    StoreHours,
    Explore

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Landing,
    Profile,
    ResetPw,
    Login,
    Signup,
    MyStore,
    RegisterStore,
    EmployeeDetail,
    Store,
    Reviews,
    StoreReview,
    StoreHours,
    Explore
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthData,
    Camera,
    Geolocation,
    ProfileData,
    StoreData,
    GeocodeService,
    SMS,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
