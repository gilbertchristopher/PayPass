import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShopPage } from '../shop/shop';
import { ProfilePage } from '../profile/profile';
import { ProductPage } from '../product/product';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/buyerService';

@IonicPage()
@Component({
  selector: 'page-tabs',
  template: 
  `
  <ion-tabs *ngIf="isBuyer">
    <ion-tab [root]="homePage" tabTitle = "Home" tabIcon="home"></ion-tab>
    <ion-tab [root]="shopPage" tabTitle = "Shop" tabIcon="basket"></ion-tab>
    <ion-tab [root]="profilePage" tabTitle = "Profile" tabIcon ="people"></ion-tab>
  </ion-tabs>
  <ion-tabs *ngIf="isSeller">
    <ion-tab [root]="homePage" tabTitle = "Home" tabIcon="home"></ion-tab>
    <ion-tab [root]="productPage" tabTitle = "Product" tabIcon="basket"></ion-tab>
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
  isBuyer: boolean;
  isSeller: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private buyerService: UserService) {
    this.isBuyer = this.isSeller = false;
  
  }

  ionViewWillEnter() {
    this.buyerData = this.buyerService.getUserData();
    if(this.buyerData.role == "Buyer"){
      this.isBuyer = true;
      this.isSeller =false;
    }
    else if(this.buyerData.role == "Seller"){
      this.isSeller = true;
      this.isBuyer = false;
    }
  }

}
