import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { UserService } from '../../services/buyerService';
import { ProductStore } from '../../data/productstore.interface';
import { AuthService } from '../../services/authService';
import firebase from 'firebase';
import { Product } from '../../data/product.interface';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  isSearchbarOpened = false;
  sellerData : any;
  productData: ProductStore;
  productsData: ProductStore[];
  items: Product[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private buyerService:UserService, private authService:AuthService) {
    this.sellerData = this.buyerService.getUserData();

    const storeRef = firebase.database().ref('user/'+this.authService.getActiveUser().uid+'/products');
    storeRef.on("value", snapshot => {
      let foo = snapshot.val();
       this.items = [];
      for(let i in foo){
        console.log(foo[i].product);
        this.items.push(foo[i].product);
        //console.log(items);
      }
      for(let item of this.items){
        console.log(item);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');

  }

  addProduct() {
    this.navCtrl.push(AddProductPage);
  }

  editProduct() {
    this.navCtrl.push(EditProductPage);
  }

  deleteProduct() {
    
  }

}
