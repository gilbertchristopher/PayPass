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
  store: any;
  lat: number = 52.678418;
  lng: number = 7.809007;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private geoloc: Geolocation) {
    this.store = navParams.data;
    this.marker = new Loc();
    this.marker.setLocation(this.store.lat, this.store.lng);
    this.lat = this.store.lat;
    this.lng = this.store.lng;   
  }

  ionViewDidLoad() {
    this.storeId = this.navParams.get('storeId');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
