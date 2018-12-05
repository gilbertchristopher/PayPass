import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from 'firebase';
import { Product } from '../../data/product.interface';
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
  productData: Product;
  sellerData : any;

  productsData: ProductStore[];
  items: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private buyerService:UserService, private authService:AuthService,
    private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController, private productService: ProductService) {
    this.sellerData = this.buyerService.getUserData();

    const storeRef = firebase.database().ref('user/'+this.authService.getActiveUser().uid+'/products');
    storeRef.on("value", snapshot => {
      let foo = snapshot.val();
       this.items = [];
      for(let i in foo){
        console.log(foo[i].product);
        foo[i].id = i;
        console.log(foo[i].product.id);
        this.items.push(foo[i]);
        //console.log(items);
      }
      for(let item of this.items){
        console.log(item);
      }
    });
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

  editProduct(product:any) {
    console.log(product);
    this.navCtrl.push(EditProductPage,product);
  }

  deleteProduct(productDelete:any) {
    console.log(productDelete);
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
            console.log(productDelete);
            this.productService.removeproduct(productDelete);
          }
        }
      ]
    });
    alert.present();
  }

}
