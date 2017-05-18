import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the StoreData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
declare var GeoFire: any;
@Injectable()
export class StoreData {
  userId: any;
  storeList: FirebaseObjectObservable<any>;
  picture: any;



  constructor(public af: AngularFire) {
   af.auth.subscribe(auth => {
     if(auth){
       this.storeList = af.database.object('/stores/' + auth.uid);
       this.userId = auth.uid
     }
   })
  }

  registerGeo(storeLat: any, storeLng: any){
    let firebaseRef = firebase.database().ref('/GeoFire');
    let geoFire = new GeoFire(firebaseRef);
    geoFire.set(this.userId, [storeLat, storeLng]).then(()=>{
      console.log("Added into GeoFire");
    }, error => {
      console.log("Error: " + error);
    });
  }

  registerStore(storeLat: string, storeLng: string, storeName: string, storeAddress: string,
                storeCity: string, storeState: string,
                storeZip: string){
    return this.storeList.set({
      storeLat: storeLat,
      storeLng: storeLng,
      storeOwner: this.userId,
      storeName: storeName,
      storeAddress: storeAddress,
      storeCity: storeCity,
      storeState: storeState,
      storeZip: storeZip
    })
  }

  addBanner(storeBanner):firebase.Promise<any>{
      return firebase.storage().ref('/storeBanner/').child(this.userId)
        .child('storeBanner.png')
        .putString(storeBanner, 'base64', {contentType: 'image/png'})
        .then((savedPicture) => {
          firebase.database().ref('/stores').child(this.userId).child('/picture')
            .set({storeBanner: savedPicture.downloadURL});
        });
  }


  getBanner(): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/stores')
        .child(firebase.auth().currentUser.uid)
        .child('/picture')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }


  getEmployeeID(username: any): Promise<any>{
    return new Promise(((resolve, reject) => {
      firebase.database().ref('/users').child(username)
        .on('value', data =>{
          resolve(data.val());
        })
    }))

  }

  addEmployeeID(username: any){
    firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
      .child('/employees')
      .push({
        name: username
      });
  }

  getEmployeePic(username: any): Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database().ref('/userProfile').child(username).child('/profilepicture')
        .on('value', data => {
          resolve(data.val());
        })
    })
  }

  getEmployees():Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/stores').child(firebase.auth().currentUser.uid).child('/employees')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            this.getEmployeeProfilePicture(snap.val().name).then((pictureSnap) =>{
              console.log("HERE" + pictureSnap.profile);
              // ref.picture = pictureSnap.profile;
              rawList.push({
                id: snap.val(),
                name: snap.val().name,
                profile : pictureSnap.profile
              });
            });
            return false
            });
          resolve(rawList);
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

  getStoreEmployees(storeID: any):Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/stores').child(storeID).child('/employees')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            this.getEmployeeProfilePicture(snap.val().name).then((pictureSnap) => {
              console.log(pictureSnap.profile);
              rawList.push({
                id: snap.val(),
                name: snap.val().name,
                profile : pictureSnap.profile
              });
            });
            return false
          });
          resolve(rawList);
        });
    });
  }
  getStoreBanner(StoreID:any): Promise<any>{
    return new Promise( (resolve, reject) => {
      firebase.database().ref('/stores')
        .child(StoreID)
        .child('/picture')
        .on('value', data => {
          resolve(data.val());
        });
    });
  }



  writeReview(storeId: any, review: string, name: string){
    firebase.database().ref('/stores')
      .child(storeId)
      .child('/reviews')
      .push({userName: name, review: review});
  }

  getReviews(storeId: any):Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/stores').child(storeId).child('/reviews')
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

  setInitialHours(){
    firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
      .child('/hours')
      .set({mondayOpen: "7AM", mondayClose: "5PM",
            tuesdayOpen: "7AM", tuesdayClose: "5PM",
            wednesdayOpen: "7AM", wednesdayClose: "5PM",
            thursdayOpen: "7AM", thursdayClose: "5PM",
            fridayOpen: "7AM", fridayClose: "5PM",
            saturdayOpen: "7AM", saturdayClose: "5PM",
            sundayOpen: "7AM", sundayClose: "5PM",})
  }

  setStoreHours(day: string, open: any, closing: any):firebase.Promise<any> {
    switch (day) {
      case "monday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({mondayOpen: open, mondayClose: closing});
      case "tuesday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({tuesdayOpen: open, tuesdayClose: closing});
      case "wednesday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({wednesdayOpen: open, wednesdayClose: closing});
      case "thursday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({thursdayOpen: open, thursdayClose: closing});
      case "friday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({fridayOpen: open, fridayClose: closing});
      case "saturday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({saturdayOpen: open, saturdayClose: closing});
      case "sunday":
        return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
          .child('/hours')
          .update({sundayOpen: open, sundayClose: closing});
      default:
        console.log("Ends up here")

    }


  }

  getStoreHours(): Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database().ref('/stores').child(firebase.auth().currentUser.uid).child('/hours')
        .on('value', data => {
          resolve(data.val());
        })
    })
  }
  getHours(storedID: any): Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database().ref('/stores').child(storedID).child('/hours')
        .on('value', data => {
          resolve(data.val());
        })
    })
  }

  addMenuItem(item: any, price: any):firebase.Promise<any>{
    return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid).child('/menu')
        .push({item: item, price: price})
  }

  getStoreMenu():Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/stores').child(firebase.auth().currentUser.uid).child('/menu')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              id: snap.val().id,
              key: snap.key,
              item: snap.val().item,
              price: snap.val().price
            });
            return false
          });
          resolve(rawList);
        });
    });
  }
  getMenu(storeID:any):Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.database()
        .ref('/stores').child(storeID).child('/menu')
        .on('value', snapshot =>{
          let rawList = [];
          snapshot.forEach(snap => {
            rawList.push({
              id: snap.val().id,
              item: snap.val().item,
              price: snap.val().price
            });
            return false
          });
          resolve(rawList);
        });
    });
  }


  removeItem(keyID: any):firebase.Promise<any>{
    return firebase.database().ref('/stores').child(firebase.auth().currentUser.uid)
      .child('/menu')
      .child(keyID)
      .set({item: null, price: null});
  }

}
