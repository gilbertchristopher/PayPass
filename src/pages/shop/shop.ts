import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CheckoutPage } from "../checkout/checkout";

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  productQty: number = 1;
  productResult = {};
  storeResult = {};
  options: BarcodeScannerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

  async scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.productResult = barcodeData;
      let toast = this.toastCtrl.create({
        message: barcodeData.cancelled + " " + barcodeData.format + " " + barcodeData.text,
        duration: 10000,
        position: "bottom"
      });
      toast.present();
    }).catch(err => {
      console.log('Error ', err);
    });
  }

  async scanQRCode() {
    this.options = {
      prompt: 'Scan a barcode to see the result!'
    }

    this.barcodeScanner.scan(this.options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.storeResult = barcodeData;
      let toast = this.toastCtrl.create({
        message: barcodeData.cancelled + " " + barcodeData.format + " " + barcodeData.text,
        duration: 10000,
        position: "bottom"
      });
      toast.present();
      // this.isStoreFound = true;
    }).catch(err => {
      console.log('Error ', err)
    })
  }

  checkout(){
    this.navCtrl.push(CheckoutPage);
  }
}
