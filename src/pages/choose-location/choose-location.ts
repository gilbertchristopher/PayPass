import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loc } from '../../services/location';
import { Geolocation } from '@ionic-native/geolocation';
import { google } from '@agm/core/services/google-maps-types';

/**
 * Generated class for the ChooseLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-location',
  templateUrl: 'choose-location.html',
})
export class ChooseLocationPage {

  @ViewChild('map') mapElement;
  map:any;


  marker: Loc;
  lat = -6.178306;
  lng = 106.631889;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoloc: Geolocation) {
   
  }

  onSetMarker(event: any){
    this.marker = new Loc();

    this.marker.setLocation(event.coords.lat, event.coords.lng);
    
  }

  onLocate(){
    this.geoloc.getCurrentPosition()
    .then(
      currLocation => {
        console.log(currLocation);
        this.lat = currLocation.coords.latitude;
        this.lng = currLocation.coords.longitude;
        this.marker.setLocation(this.lat, this.lng);
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    )
  }

  ionViewDidLoad() {
    // // console.log('ionViewDidLoad ChooseLocationPage');
    // this.initMap();
  }

  // initMap(){
  //   let latLng = new google.maps.latLng(-34.9290, 138.6010);

  //   let mapOptions ={
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  // }

}
