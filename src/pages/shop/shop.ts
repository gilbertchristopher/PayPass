import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { BuyerService } from '../../services/buyerService';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  productQty: number = 1;
  productResult = {};
  storeResult = {};
  isStoreFound: boolean;
  options: BarcodeScannerOptions;
  buyerData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private buyerService: BuyerService) {
    this.buyerData = this.buyerService.getBuyerData();
    this.isStoreFound = this.buyerData.isStoreFound;
    let toast = this.toastCtrl.create({
      message: this.isStoreFound.toString(),
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  async scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.productResult = barcodeData;
      let toast = this.toastCtrl.create({
        message: barcodeData.cancelled + " " + barcodeData.format + " " + barcodeData.text,
        duration: 5000,
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
        duration: 5000,
        position: "bottom"
      });
      toast.present();
      this.isStoreFound = true;
      this.buyerService.updateBuyerData({isStoreFound: true});
    }).catch(err => {
      console.log('Error ', err)
    })
  }
}
