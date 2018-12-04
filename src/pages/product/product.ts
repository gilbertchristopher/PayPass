import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from 'firebase';
import { Product } from '../../data/product.interface';
import { AuthService } from '../../services/authService';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  isSearchbarOpened = false;
  productData: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private authService: AuthService,
      private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  async addProduct() {
    this.barcodeScanner.scan().then(barcodeData => {
      let uid = this.authService.getActiveUser().uid;

      //ambil data di product
      const productRef = firebase.database().ref('product/' + barcodeData.text);
      productRef.on('value', product => {
        this.productData = product.val();
      
        //ambil data product di toko
        const storeRef = firebase.database().ref('user/' + uid + '/products/' + barcodeData.text);
        storeRef.on('value', productStore => {
          let result = productStore.val();
          if(result == null){
            this.navCtrl.push(AddProductPage, {product: this.productData, id: barcodeData.text});
          }
          else {
            let toast= this.toastCtrl.create({
              message: "This product's already in your store!",
              duration: 3000,
              position: "bottom"
            })
            toast.present();
          }
        })
      })
    }).catch(err => {
      console.log(err);
    });

    // var json;
    // const storeRef = firebase.database().ref('user/' + this.authService.getActiveUser().uid + '/products');
    // storeRef.on("value", snapshot => {
    //   let foo = snapshot.val();
    //   for(let i in foo){
    //     console.log(foo[i].product.name)
    //   }
    // });
    
  }

  editProduct() {
    this.navCtrl.push(EditProductPage);
  }

  deleteProduct() {
    
  }

}
