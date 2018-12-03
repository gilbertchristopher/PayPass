import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { UserService } from '../../services/buyerService';
import { ProductStore } from '../../data/productstore.interface';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private buyerService:UserService) {
    this.sellerData = this.buyerService.getUserData();
    console.log(this.sellerData);
    console.log(this.sellerData.products);
    for(let product of this.sellerData.products){
      this.productData.price = product.price;
      this.productData.qty = product.qty;
      this.productData.product.productName = product.product.name;
      this.productData.product.productDesc = product.product.desc;
      this.productData.product.id = product.key;
      this.productsData.push(this.productData)
    }
    for(let product of this.productsData){
      console.log(product)
    }
    // console.log(this.sellerData.products[]);
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
