import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ViewController } from 'ionic-angular';
import { Loc } from '../../services/location';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';

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
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private geoloc: Geolocation, private toastCtrl: ToastController, private modalCtrl: ModalController, private viewCtrl: ViewController, private nativeGeocoder: NativeGeocoder) {
    this.marker = new Loc();
    this.onLocate();
  }

  onSetMarker(event: any){
    

    this.marker.setLocation(event.coords.lat, event.coords.lng);
    
  }

  onLocate(){
    this.geoloc.getCurrentPosition()
    .then(
      currLocation => {
        // console.log(currLocation);
        let toast = this.toastCtrl.create({
          message: currLocation.coords.latitude + " " + currLocation.coords.longitude,
          duration: 3000,
          position: 'bottom',
        }) 
        toast.present();
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
  
  onSubmit(){
    console.log(this.marker);

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
  

    this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
    .then((result: NativeGeocoderReverseResult[]) => {
      console.log(JSON.stringify(result[0]))
      let toast = this.toastCtrl.create({message: JSON.stringify(result[0].countryName), duration: 3000, position: "bottom"})
      toast.present();
      this.viewCtrl.dismiss(this.marker, JSON.stringify(result[0]))
    }).catch((error: any) => console.log(error));

  }

  cancel(){
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
