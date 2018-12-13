import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../../services/buyerService';


@IonicPage()
@Component({
  selector: 'page-history-details',
  templateUrl: 'history-details.html',
})
export class HistoryDetailsPage {

  transactionData: any;
  transactionId: string;
  storeId: string;
  productData: any[];
  total: number;
  totalPerProduct: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private userService: UserService) {
    this.transactionId = this.navParams.get('transactionId');
    this.storeId = this.navParams.get('storeId');
    
    this.total = 0;
    this.totalPerProduct = 0;

    if (this.transactionId != null && this.storeId != null) {
      this.userService.getTransactionData({"transactionId": this.transactionId, "storeId":this.storeId}).then((data) => {
        this.transactionData = data;
        console.log(this.transactionData);
        console.log(this.storeId);
        this.productData = [];

        for (let i in this.transactionData.products) {
          this.totalPerProduct = (this.transactionData.products[i].qty * this.transactionData.products[i].price)
          this.transactionData.products[i].totalPerProduct = this.totalPerProduct;
          this.productData.push(this.transactionData.products[i]);
          this.total = this.total + +this.totalPerProduct;
        }
        console.log(this.total)
      })
    }
    else {
      this.transactionData = this.navParams.data;
      this.total = 0;
      this.productData = [];
      for (let i in this.transactionData.products) {
        this.totalPerProduct = (this.transactionData.products[i].qty * this.transactionData.products[i].price)
        this.transactionData.products[i].totalPerProduct = this.totalPerProduct;
        this.productData.push(this.transactionData.products[i]);
        this.total = this.total + +this.totalPerProduct;

      }
      console.log(this.total)
    }
  }

  ondismiss(){
    this.viewCtrl.dismiss();
  }
}
