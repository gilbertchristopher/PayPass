import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../services/authService';

@IonicPage()
@Component({
  selector: 'page-home-seller',
  templateUrl: 'home-seller.html',
})
export class HomeSellerPage {
  resultQRCode: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private barcodeScanner: BarcodeScanner,
            private toastCtrl: ToastController) {
  }

  ionViewWillEnter() {
    let uid = this.authService.getActiveUser().uid;
    this.encodeText(uid)
    // this.resultQRCode = this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, uid)
    // console.log(this.resultQRCode)
  }

  async encodeText(uid: string) {
    
    const result = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, uid)
    console.log(result);
    let toast = this.toastCtrl.create({
      message: result,
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

}
