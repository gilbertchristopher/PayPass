import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/buyerService';
import { TransactionDetailsPage } from '../transaction-details/transaction-details';

@IonicPage()
@Component({
  selector: 'page-home-seller',
  templateUrl: 'home-seller.html',
})
export class HomeSellerPage {
  resultQRCode: any;
  userData: any;
  transactions: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private barcodeScanner: BarcodeScanner,
            private toastCtrl: ToastController, private userService: UserService) {

              this.userData = this.userService.getUserData();

  }

  ionViewWillEnter() {
    this.userService.getAllTransactionData().then((data) => {
      this.transactions = [];
      for(let i in data){
        data[i].id = i;
        this.transactions.push(data[i]);
      }
    })
  }

  async encodeText() {
    var uid = this.authService.getActiveUser().uid;
    const result = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, uid)
    console.log(result);
    let toast = this.toastCtrl.create({
      message: result,
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  transactionDetails(transaction: any){
    console.log(transaction);
    this.navCtrl.push(TransactionDetailsPage, transaction);
  }



}
