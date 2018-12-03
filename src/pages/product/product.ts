import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { EditProductPage } from '../edit-product/edit-product';
import { UserService } from '../../services/buyerService';


@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  isSearchbarOpened = false;
  sellerData: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private buyerService:UserService) {
    this.sellerData = this.buyerService.getUserData();
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
