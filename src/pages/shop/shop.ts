import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { UserService } from '../../services/buyerService';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  productQty: number = 1;
  productResult = {};
  storeResult = {};
  isStoreFound: string;
  options: BarcodeScannerOptions;
  buyerData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private userService: UserService) {
    this.buyerData = this.userService.getUserData();
    this.isStoreFound = this.buyerData.isStoreFound;
    let toast = this.toastCtrl.create({
      message: this.isStoreFound.toString(),
      duration: 5000,
      position: "bottom"
    });
    toast.present();

    if(this.isStoreFound != ""){
      this.storeResult = userService.readStoreData(this.isStoreFound);
    }
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
      // buat kalo belum ada data transaction di toko itu
      this.userService.readStoreData(barcodeData.text).then((storeInfo) => {
        this.storeResult = storeInfo;
        console.log(this.storeResult);
        // let toast = this.toastCtrl.create({
        //   message: barcodeData.cancelled + " " + barcodeData.format + " " + barcodeData.text,
        //   duration: 5000,
        //   position: "bottom"
        // });
        // toast.present();
        this.isStoreFound = barcodeData.text;
        this.userService.updateUserData({ isStoreFound: barcodeData.text });
      });
    }).catch(err => {
      console.log('Error ', err)
    })
  }

  addProductQuantity(product: any) {

  }

  substractProductQty(product: any) {

  }
}
