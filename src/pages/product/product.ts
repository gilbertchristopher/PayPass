import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from 'firebase';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/buyerService';
import { ProductStore } from '../../data/productstore.interface';
import { AlertController } from 'ionic-angular';
import { ProductService } from '../../services/productService';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  isSearchbarOpened = false;
  productData: any;
  sellerData : any;

  productsData: ProductStore[];
  items: ProductStore[];
  loadedItems: ProductStore[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private buyerService:UserService, private authService:AuthService,
    private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController, private productService: ProductService) {
    this.sellerData = this.buyerService.getUserData();

    const storeRef = firebase.database().ref('seller/'+this.authService.getActiveUser().uid+'/products');
    storeRef.on("value", snapshot => {
      let foo = snapshot.val();
       this.items = [];
      for(let i in foo){
        foo[i].id = i;
        this.items.push(foo[i]);
        this.loadedItems.push(foo[i]);
      }
    });
  }

  addProduct() {
    this.barcodeScanner.scan().then(barcodeData => {
      let uid = this.authService.getActiveUser().uid;

      //ambil data di product
      this.productService.getProduct(barcodeData.text).then(product => {
        this.productData = product;

        //ambil data product di toko
        this.productService.checkProduct(barcodeData.text).then(value => {
          if(value){
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
  }

  editProduct(product:any) {
    this.navCtrl.push(EditProductPage,product);
  }

  deleteProduct(productDelete:any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this product?',
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
            this.productService.removeproduct(productDelete);
          }
        }
      ]
    });
    alert.present();
  }

  onSearch(search) {
    this.items = this.loadedItems;
    var query = search.srcElement.value;
    if(!query){
      return
    }
    this.items = this.items.filter((value) => {
      if(value.product.name && query) {
        if (value.product.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          return true;
        }
      }
    });
  }

  cancelSearch() {
    this.isSearchbarOpened = false;
    this.items = this.loadedItems;
  }
}
