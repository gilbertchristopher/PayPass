import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegistersellerOpenhourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerseller-openhour',
  templateUrl: 'registerseller-openhour.html',
})
export class RegistersellerOpenhourPage {
  userData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userData = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersellerOpenhourPage');
  }

}
