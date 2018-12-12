import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/buyerService';
import * as https from 'https';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-transaction-details',
  templateUrl: 'transaction-details.html',
})
export class TransactionDetailsPage {
  transactionData: any;
  transactionId: string;
  storeId: string;
  productData: any[];
  total: number;
  totalPerProduct: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
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

  ionViewDidLoad() {

  }

  confirm() {
    this.userService.changeStatusTransaction("success", this.transactionData.id, this.transactionData.buyerInfo.id);
    this.sendNotif();
    this.navCtrl.setRoot(TabsPage);
  }

  cancel(){
    this.userService.changeStatusTransaction("cancelled", this.transactionData.id, this.transactionData.buyerInfo.id);
    this.navCtrl.setRoot(TabsPage);
  }

  sendNotif() {
    var sendNotification = function (data) {
      var headers = {
        "Content-Type": "application/json; charset=utf-8"
      };

      var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
      };

      // var https = require('https');
      var req = https.request(options, function (res) {
        res.on('data', function (data) {
          console.log("Response:");
          console.log(JSON.parse(data));
        });
      });

      req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
      });

      req.write(JSON.stringify(data));
      req.end();
    };

    var message = {
      app_id: "7ae173a1-545e-4bc1-92e3-1839314e42bd",
      contents: { "en": "Your transaction is successful" },
      headings: { "en": "Success!" },
      include_player_ids: ["ad9ec0eb-4b37-4ba6-9a6b-b2902352768d"],
      small_icon: "ic_stat_onesignal_default",
    };

    sendNotification(message);
  }

}
