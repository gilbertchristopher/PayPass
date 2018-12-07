import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, 
      private toastCtrl: ToastController, private userService: UserService, private storage: Storage, private alertCtrl: AlertController) {
    this.buyerData = this.userService.getUserData();
    
    this.transactionId = this.buyerData.transactionIdNow;
    this.storeId = this.buyerData.storeIdNow;

    if (this.transactionId != "") {
      // ambil cart shop sekarang dari local storage
      this.storage.get('cartShop').then(value => {
        if(value != ""){
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
        const storeRef = firebase.database().ref('user/' + this.storeId + '/products/' + barcodeData.text);
        storeRef.on('value', product => {
          this.productData = product.val();
          this.productData['qty'] = 1;
          this.productData['id'] = barcodeData.text;
          console.log('productData ', this.productData);
          this.products.push(this.productData);
          this.storage.set('cartShop', this.products);
          // this.userService.addProductToTransaction(this.storeId, this.productData, product.key, this.transactionId);

          this.showToast("Product has stored in the cart.");
        })
      }
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

  addProductQuantity(index: any) {
    this.products[index].qty = this.products[index].qty + 1;
    this.storage.set('cartShop', this.products);
  }

  substractProductQuantity(index: any) {
    if(this.products[index].qty == 1){
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
              this.storage.set('cartShop',this.products);
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
    this.showToast("Checkout Success");
    // this.userService.addProductToTransaction(this.isStoreFound, this.productList)
    this.storage.remove('productList');
    this.storage.remove('transactionId');
    this.storage.remove('cartShop');
    this.transactionId = null;
    this.navCtrl.push(CheckoutPage);
  }
}
