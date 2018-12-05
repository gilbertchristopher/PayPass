import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CheckoutPage } from "../checkout/checkout";
import { UserService } from '../../services/buyerService';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { ProductTransaction } from '../../data/producttransaction.interface';


@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  productList: {};
  products: any[] = [];
  productQty: number = 1;
  storeResult: any;
  productResult: ProductTransaction[];
  productData: ProductTransaction;
  storeId: string;
  transactionId: string;
  options: BarcodeScannerOptions;
  buyerData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, 
    private userService: UserService, private storage: Storage) {
    this.buyerData = this.userService.getUserData();
    // storage.get('productList').then(products => {
    //   this.productList.push(products);
    // })
    this.transactionId = this.buyerData.transactionIdNow;
    this.storeId = this.buyerData.storeIdNow;

    this.showToast(this.transactionId + " " + this.storeId)
  }


  ionViewWillEnter() {
    if (this.transactionId != "") {
      // ambil transaction id sekarang dari local storage
      this.showToast(this.transactionId + " " + this.storeId)
      this.storage.get('transactionId').then(res => {
        this.userService.readStoreData(this.storeId, true, this.transactionId).then(res => {
          this.productList = res;
          
          this.products = [];
          for (let i in this.productList) {
            this.products.push(this.productList[i])
          }
        });
      });
      this.storage.get('storeData').then(value => {
        for(let i in value){
          this.showToast(value[i].storeName + " " + value[i].email);
          this.storeResult = value[i];
        }
        // this.storeResult = value;
      })
      // this.showToast(this.storeResult.email + " " + this.storeResult.storeName)
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
      const storeRef = firebase.database().ref('user/' + this.storeId + '/products/' + barcodeData.text);
      storeRef.on('value', product => {
        this.productData = product.val();
        this.productData['qty'] = 1;
        this.userService.addProductToTransaction(this.storeId, this.productData, product.key, this.transactionId);

        this.showToast("Product has stored in the cart.");
      })

    }).catch(err => {
      this.showToast("Product doesn't found in this store.");
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
        this.userService.updateUserData({ storeIdNow: barcodeData.text });
      });
    }).catch(err => {
      console.log('Error ', err)
    })
  }

  addProductQuantity(product: any) {
    this.products[this.products.indexOf(product)].qty = this.products[this.products.indexOf(product)].qty + 1;
  }

  substractProductQty(product: any) {
    if(this.products[this.products.indexOf(product)].qty > 1){
      this.products[this.products.indexOf(product)].qty = this.products[this.products.indexOf(product)].qty - 1;
    }
    else{
      this.products.splice(this.products.indexOf(product), 1);
    }
    
  }
  checkout() {
    this.showToast("Checkout Success");
    // this.userService.addProductToTransaction(this.isStoreFound, this.productList)
    this.storage.remove('productList');
    this.storage.remove('transactionId');
    this.transactionId = null;
    this.navCtrl.push(CheckoutPage);
  }
}
