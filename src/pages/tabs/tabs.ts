import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShopPage } from '../shop/shop';
import { ProfilePage } from '../profile/profile';
import { ProductPage } from '../product/product';
import { AuthService } from '../../services/authService';
import firebase from 'firebase';
import { BuyerService } from '../../services/buyerService';
import { Buyer } from '../../data/buyer.interface';


/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  template: 
  `
  <ion-tabs>
    <ion-tab [root]="homePage" tabTitle = "Home" tabIcon="home"></ion-tab>
    <ion-tab [root]="shopPage" tabTitle = "Shop" tabIcon="basket"></ion-tab>
    <ion-tab [root]="profilePage" tabTitle = "Profile" tabIcon ="people"></ion-tab>
  </ion-tabs>
  `,
})
// <ion-tab [root]="productPage" tabTitle = "Product" tabIcon="basket"></ion-tab>
export class TabsPage {

  homePage = HomePage;
  shopPage = ShopPage;
  profilePage = ProfilePage;
  productPage = ProductPage;
  buyerData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private buyerService: BuyerService) {
  }

  ionViewDidLoad() {
    
    this.buyerData = this.buyerService.viewBuyerData()
    // let userId = this.authService.getActiveUser().uid;
    // this.buyerData = this.buyerService.getBuyerData()
    // console.log(this.buyerData)
    // console.log("user: " + userId);
    console.log('ionViewDidLoad TabsPage');
  }

}
