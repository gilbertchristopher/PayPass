import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShopPage } from '../shop/shop';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the ScanConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-confirmation',
  templateUrl: 'scan-confirmation.html',
})
export class ScanConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanConfirmationPage');
  }

  showBarcodeScanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.navCtrl.push(ShopPage);
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
