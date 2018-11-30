import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShopPage } from '../shop/shop';
import { ProfilePage } from '../profile/profile';
import { ProductPage } from '../product/product';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
