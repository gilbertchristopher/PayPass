import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Loc } from '../../services/location';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

import { google } from '@agm/core/services/google-maps-types';


@IonicPage()
@Component({
  selector: 'page-choose-location',
  templateUrl: 'choose-location.html',
})
export class ChooseLocationPage {

  @ViewChild('map') mapElement;
  map: any;


  marker: Loc;
  lat: number;
  lng: number;
  address: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private geoloc: Geolocation, private toastCtrl: ToastController, private modalCtrl: ModalController, private viewCtrl: ViewController, private nativeGeocoder: NativeGeocoder) {
    this.marker = new Loc();
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    if(this.lat == null && this.lng == null){
      this.onLocate();
    }
    else{
      this.marker.setLocation(this.lat, this.lng);
    }
  }

  onSetMarker(event: any) {
    this.marker.setLocation(event.coords.lat, event.coords.lng);
  }

  onLocate() {
    this.geoloc.getCurrentPosition()
      .then(
        currLocation => {
          this.lat = currLocation.coords.latitude;
          this.lng = currLocation.coords.longitude;
          this.marker.setLocation(this.lat, this.lng);
        }
      )
      .catch(
        error => {
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: 'bottom',
          })
          toast.present();

        }
      )
  }

  onSubmit() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };


    this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
      .then((result: NativeGeocoderReverseResult[]) => {
        this.address = this.generateAddress(result[0]);
        console.log(this.address);
        // 
        this.viewCtrl.dismiss({"marker": this.marker, "data": JSON.stringify(result[0]), "address": this.address})
      }).catch((error: any) => console.log(error));

  }

  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  cancel() {
    this.viewCtrl.dismiss();
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
