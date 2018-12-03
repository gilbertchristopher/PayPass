import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { CheckoutPage } from "../checkout/checkout";
import { UserService } from '../../services/buyerService';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  productList: any;
  productQty: number = 1;
  storeResult: any;
  productResult: Array<any>;
  productData: any;
  isStoreFound: string;
  transactionId: string;
  options: BarcodeScannerOptions;
  buyerData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private userService: UserService, private storage: Storage) {
    this.buyerData = this.userService.getUserData();
    storage.get('productList').then(products => {
      this.productList = products;
    })
    this.isStoreFound = this.buyerData.isStoreFound;

    // if (this.isStoreFound == "" && this.transactionId != null) {
    //   this.storage.remove('transactionId');
    //   this.transactionId = null;
    // }
    if (this.isStoreFound != "") {
      // ambil transaction id sekarang dari local storage
      this.storage.get('transactionId').then(res => {
        this.transactionId = res;
        this.userService.readStoreData(this.isStoreFound, true, this.transactionId).then(res => {
          // this.productResult.push(res);
          this.showToast(this.transactionId + " " + res);
        });
        
      });

    }
  }


  ionViewWillEnter(){
    if (this.isStoreFound != "") {
      // ambil transaction id sekarang dari local storage
      this.storage.get('transactionId').then(res => {
        this.transactionId = res;
        this.userService.readStoreData(this.isStoreFound, true, this.transactionId).then(res => {
          // this.productResult.push(res);
          this.showToast(this.transactionId + " " + res);
        });
        // this.showToast(this.transactionId + " " + this.productResult);
      });

    }
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: "bottom"
    });
    toast.present();
  }

  async scanBarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.showToast(barcodeData.cancelled + " " + barcodeData.format + " " + barcodeData.text + " " + this.isStoreFound + " " + this.transactionId)


      const storeRef = firebase.database().ref('user/' + this.isStoreFound + '/products/' + barcodeData.text);
      storeRef.on('value', product => {
        this.productData = product.val();

        this.productData['qty'] = 1;

        // this.showToast(this.productData.name + " " + this.productData.desc + " " + this.productData.price + " " + this.productData.qty );
        // this.productList.push(product.val());
        this.userService.addProductToTransaction(this.isStoreFound, this.productData, product.key, this.transactionId);

        // this.storage.set('productList', this.productList).then(() => {
        //   this.showToast("Product has stored in the cart.");
        // }).catch(() => {
        //   this.showToast("Product doesn't found in this store.");
        // })
      })

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
        this.storeResult = storeInfo;
        console.log(this.storeResult);

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
  checkout() {
    // const transactionRef = firebase.database().ref('user/' + this.buyerData.id + '/transactions/' + this.transactionId + '/products/');
    // transactionRef.set(this.productList)
    this.showToast("Checkout Success");
    // this.userService.addProductToTransaction(this.isStoreFound, this.productList)
    // if(this.productList.length > 0) this.productList.splice(0, this.productList.length-1);
    this.storage.remove('productList');
    this.navCtrl.push(CheckoutPage);
  }
}
