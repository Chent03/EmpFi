import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthData {
  userID: any;
  fireAuth: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe((user) => {
      if(user){
        this.fireAuth = user.auth;
        // console.log("Firebase object: " + JSON.stringify(this.fireAuth))
        this.userID = user.uid;
      }
    });
  }

  getUser():any{
    return this.fireAuth;
  }

  loginUser(loginEmail: string, loginPassword): any{
    return this.af.auth.login({email: loginEmail, password: loginPassword})
  }

  noAccountLogin(): any{
    return this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    })
  }



  resetPassword(email: string): any{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logout():any{
    return this.af.auth.login();
  }

  signupUser(firstName: string, lastName: string, username: string, email: string, number: string, password: string): firebase.Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) =>{
        firebase.database().ref('/userProfile').child(user.uid).child('profile')
          .set({firstName: firstName,
                lastName: lastName,
                email: email,
                number: number,
                password: password}).then(()=>{
          firebase.database().ref('/users').child(username)
            .set({userID: user.uid})
        });
      });
  }

  logUser(username: string){
    firebase.database().ref('/users').child(username)
      .set({userID: this.userID});
  }

  getStatus(){
    return this.fireAuth;
  }

}
