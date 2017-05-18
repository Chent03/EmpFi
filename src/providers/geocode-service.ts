import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GeocodeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeocodeService {
  data: any;
  apikey: string = 'AIzaSyDhOYKojwWaTGZJZ0eXADIaLZDXux3qF2k';

  constructor(public http: Http) {
    this.data = null;
  }

  getLatLong(storeAddress: string, storeCity: string, storeState: string){
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve =>{
      this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
        + encodeURIComponent(storeAddress) + encodeURIComponent(storeCity) + encodeURIComponent(storeState) +'&key='+this.apikey)
        .map(res => res.json())
        .subscribe(data => {
          if(data.status === "OK"){
            resolve({name: data.results[0].formatted_address,
              location:{
                latitude: data.results[0].geometry.location.lat,
                longitude: data.results[0].geometry.location.lng
            }});
          } else {
            console.log(data);
          }
        });
    });
  }

}
