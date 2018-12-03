import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Loc } from '../../services/location';

@IonicPage()
@Component({
  selector: 'page-store-information',
  templateUrl: 'store-information.html',
})
export class StoreInformationPage {
  storeId: String;
  marker: Loc;
  lat: number = 52.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private geoloc: Geolocation) {
    console.log('Store ID: ', navParams.get('storeId'))
    this.marker = new Loc();
    this.marker.setLocation(this.lat, this.lng);   
  }

  ionViewDidLoad() {
    this.storeId = this.navParams.get('storeId');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
