import { Component, ViewChild} from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Store } from '../store/store';

import firebase from 'firebase';

declare var GeoFire: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement;
  map: any;
  firebaseRef = firebase.database().ref('/GeoFire');
  geoFire = new GeoFire(this.firebaseRef);
  center: any;
  radiusInKm = 0.5;
  lat: number;
  lng: number;

  storeQuery = {};




  constructor(public navCtrl: NavController, private geolocation: Geolocation, public modalCtrl: ModalController) {

  }

  ionViewDidEnter(){
    let ref = this.navCtrl;
    this.geolocation.getCurrentPosition().then((position) =>{
      this.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: this.center,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      console.log(this.lat + " , " + this.lng);
      let geoQuery = this.geoFire.query({
        center: [this.lat, this.lng],
        radius: 50
      });

      geoQuery.on("key_entered", function(key, location) {


        let storeID = key.split(":"[1]);
        console.log(location[1]);
        // this.plantMarker(store[0], store[1]);


        firebase.database().ref('/stores').child(key).once("value", function (data) {
          let store = data.val();

          console.log(store.storeName);

          let marker = new google.maps.Marker(({
            map: map,
            position: new google.maps.LatLng(location[0], location[1])
          }));

          let content = store.storeName;

          let infoWindow = new google.maps.InfoWindow({
            content:content
          });
          google.maps.event.addListener(marker, 'click', () => {
            console.log("STORE ID" + storeID.toString());
            let sID = storeID.toString();
            ref.push(Store, {'storeID': sID, 'storeName' : store.storeName});
            infoWindow.open(map, marker);
          });

        });
      })



    });

  }

  addMarker(lat: number, lng: number){
    let marker = new google.maps.Marker(({
      map: this.map,
      position: new google.maps.LatLng(lat, lng)
    }));

    let content = "<h4>information</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content:content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }



  initMap(){

    let options = {timeout: 10000, enableHighAccuracy: true};

    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    });
  }

  openStore(storeID){
    let modal = this.modalCtrl.create(Store, {storeID: storeID});
    modal.present();
  }


}
