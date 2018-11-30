import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShopPage } from '../shop/shop';
import { ProfilePage } from '../profile/profile';
import { ProductPage } from '../product/product';
import { AuthService } from '../../services/authService';
import { BuyerService } from '../../services/buyerService';

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

export class TabsPage {

  homePage = HomePage;
  shopPage = ShopPage;
  profilePage = ProfilePage;
  productPage = ProductPage;
  buyerData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private buyerService: BuyerService) {
  }

  ionViewDidLoad() {
    this.buyerData = this.buyerService.requestBuyerData();
  }

}
