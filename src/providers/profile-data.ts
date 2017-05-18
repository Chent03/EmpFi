import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'
import firebase from 'firebase';
import { AngularFire } from 'angularfire2';
/*
  Generated class for the ProfileData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileData {
  userID: any;
  randomID: any;

  constructor(public af: AngularFire) {
    af.auth.subscribe((user) => {
      if(user){
        this.userID = user.uid;
      }
    });
  }

  getUserProfile(): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(firebase.auth().currentUser.uid)
        .child('/profile')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }

  getEmployeeData(employeeID: any): Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(employeeID)
        .child('/profile')
        .on('value', data=>{
          resolve(data.val());
        })
    })
  }

  writeReview(employeeId: any, review: string, name: string):firebase.Promise<any>{
    return firebase.database().ref('/userProfile')
      .child(employeeId)
      .child('/reviews')
      .push({userName: name, review: review});
  }

  getReviews(employeeID: any):Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/userProfile').child(employeeID).child('/reviews')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            this.getEmployeeProfilePicture(snap.val().userName).then((pictureSnap) => {
              rawList.push({
                id: snap.val(),
                review: snap.val().review,
                picture: pictureSnap.profile
              });
            });
            return false
          });
          resolve(rawList);
        });
    });
  }

  addProfilePicture(picture):firebase.Promise<any>{

    return firebase.storage().ref('/profile/').child(firebase.auth().currentUser.uid)
      .child('profile.png')
      .putString(picture, 'base64', {contentType: 'image/png'})
      .then((savedPicture) => {
        firebase.database().ref('/userProfile').child(firebase.auth().currentUser.uid).child('/picture')
          .set({profile: savedPicture.downloadURL});
      });

  }

  getProfilePicture(): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(firebase.auth().currentUser.uid)
        .child('/picture')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }

  getEmployeeProfilePicture(employeeID: any): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(employeeID)
        .child('/picture')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }

  addPictures(picture): firebase.Promise<any>{
    this.makeid();
    console.log(this.randomID);
    return firebase.storage().ref('/profile/').child(firebase.auth().currentUser.uid)
      .child(this.randomID + '.png')
      .putString(picture, 'base64', {contentType: 'image/png'})
      .then((savedPicture) => {
        firebase.database().ref('/userProfile').child(firebase.auth().currentUser.uid).child('/content')
          .push({content: savedPicture.downloadURL}).then(()=>{
          firebase.database().ref('/explore').push(
            {user: firebase.auth().currentUser.uid, content: savedPicture.downloadURL});
        });
      });
  }

  makeid(){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i =0; i< 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.randomID = text;
  }

  getContent():Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/userProfile').child(firebase.auth().currentUser.uid).child('/content')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              content: snap.val().content
            });
            return false
          });
          resolve(rawList);
        });
    });
  }
  getEmployeeContent(employeeID: any):Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/userProfile').child(employeeID).child('/content')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              content: snap.val().content
            });
            return false
          });
          resolve(rawList);
        });
    });
  }

  addBio(bio: any){
    firebase.database().ref('/userProfile').child(firebase.auth().currentUser.uid)
      .child('/bio')
      .set({bio: bio});
  }
  getBio(): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(firebase.auth().currentUser.uid)
        .child('/bio')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }
  getUserBio(userID: any): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/userProfile')
        .child(userID)
        .child('/bio')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }

  logoutUser(): firebase.Promise<void>{
    return firebase.auth().signOut();
  }


  explore():Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/explore')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              content: snap.val().content,
              user: snap.val().user
            });
            return false
          });
          resolve(rawList);
        });
    });
  }







}
