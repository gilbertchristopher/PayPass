import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CheckoutPage } from "../checkout/checkout";
import { UserService } from '../../services/buyerService';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { ProductTransaction } from '../../data/producttransaction.interface';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import * as https from 'https';
// declare module 'https'
// import https from 'https'


// import ;
// var https = require('https')
@IonicPage()

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
@Injectable()
export class ShopPage {
  productList: {};
  products: any[] = [];
  productCheckout: any[] = [];
  productQty: number = 1;
  storeResult: any;
  productResult: ProductTransaction[];
  productData: any;
  storeId: string;
  transactionId: string;
  options: BarcodeScannerOptions;
  buyerData: any;
  storeData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController, private userService: UserService, private storage: Storage, private alertCtrl: AlertController) {
    this.buyerData = this.userService.getUserData();

    this.transactionId = this.buyerData.transactionIdNow;
    this.storeId = this.buyerData.storeIdNow;
    this.userService.getStoreData(this.storeId).then((store) => {
      this.storeData = store;
    })

    if (this.transactionId != "") {
      // ambil cart shop sekarang dari local storage
      this.storage.get('cartShop').then(value => {
        if (value != "") {
          this.products = [];
          for (let index = 0; index < value.length; index++) {
            this.products.push(value[index]);
          }
        }
        console.log("cartshop", value)
      }).catch(err => {
        console.log("cart error", err)
      })

      this.storage.get('storeData').then(value => {
        this.storeResult = value;
      })
    }
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  async scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text != ""){
        const storeRef = firebase.database().ref('seller/' + this.storeId + '/products/' + barcodeData.text);
        storeRef.on('value', product => {
          this.productData = product.val();
          if(this.productData != null){
            this.productData['qty'] = 1;
            this.productData['id'] = barcodeData.text;
            let idx = this.products.map((value) => {
              return value.id
            }).indexOf(barcodeData.text);
            if(idx > -1){
              this.showToast("This product's already in your cart.");
            }
            else{
              this.products.push(this.productData);
              this.storage.set('cartShop', this.products);
              this.showToast("This product has been added to the cart.");
            }
          }
          else {
            this.showToast("This product is not found in this store.");
          }
        })
      }
    }).catch(err => {
      console.log('Error ', err);
    });
  }

  async scanQRCode() {
    this.options = {
      prompt: 'Scan a barcode to see the result!'
    }

    this.barcodeScanner.scan(this.options).then(barcodeData => {
      // buat kalo belum ada data transaction di toko itu
      this.userService.readStoreData(barcodeData.text, false, null).then((storeInfo) => {
        this.storeResult = storeInfo['storeData'];
        this.transactionId = storeInfo['transactionId']
        this.storeId = barcodeData.text;
        this.userService.updateUserData({ storeIdNow: barcodeData.text }, 'buyer');
      });
    }).catch(err => {
      console.log('Error ', err)
    })
  }

  addProductQuantity(index: any) {
    this.products[index].qty = this.products[index].qty + 1;
    this.storage.set('cartShop', this.products);
  }

  substractProductQuantity(index: any) {
    if (this.products[index].qty == 1) {
      let alert = this.alertCtrl.create({
        title: 'Remove Product From Cart',
        message: 'Do you want to remove this product?',
        buttons: [
          {
            text: 'No',
            role: 'no',
            handler: () => {
              console.log('No');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              this.products.splice(index, 1);
              this.storage.set('cartShop', this.products);
            }
          }
        ]
      });
      alert.present();
    }
    else {
      this.products[index].qty = this.products[index].qty - 1;
      this.storage.set('cartShop', this.products);
    }
  }

  checkout() {
    this.productCheckout = [];
    for (let index = 0; index < this.products.length; index++) {
      this.productCheckout[this.products[index].id] = { "qty": this.products[index].qty, "price": this.products[index].price, "product": this.products[index].product }
    }
    this.userService.addProductToTransaction(this.transactionId, this.productCheckout, this.storeId, this.buyerData);
    this.sendNotif() 
    this.showToast("Checkout Success");
    this.storage.remove('productList');
    this.storage.remove('transactionId');
    this.storage.remove('cartShop');
    this.transactionId = null;
    this.navCtrl.push(CheckoutPage, {"storename": this.storeData.storename, "address" : this.storeData.address, "phoneNumber": this.storeData.phoneNumber,});
  }

  sendNotif() {
    var sendNotification = function (data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8"
      };

      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };

      // var https = require('https');
      var req = https.request(options, function (res) {
        res.on('data', function (data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });

      req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
      });

      req.write(JSON.stringify(data));
      req.end();
    };

    var message = {
      app_id: "7ae173a1-545e-4bc1-92e3-1839314e42bd",
      contents: { "en": "Transaction ID: " + this.transactionId + " wants to finish its shopping. Confirm Now!" },
      
      data: { "transactionId": this.transactionId, 
              "sellerId": this.storeId  },
      include_player_ids: ["d02154d3-3874-4931-bc38-88602fb093a4"],
      small_icon: "ic_stat_onesignal_default",
      headings: { "en": "New Transaction" },
    };

    sendNotification(message);
    this.showToast("asd")
  }

}
