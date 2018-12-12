import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

storename: string;
address: string;
phoneNumber: any;
date: Date;
dateNow: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.storename = this.navParams.get("storename")
    this.address = this.navParams.get("address")
    this.phoneNumber = this.navParams.get("phoneNumber")
    this.date = new Date()
    this.dateNow = this.date.getDate;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
  }

  cancel(){
    this.navCtrl.pop();
  }

}
