import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ShopPage } from '../shop/shop';
import { ProfilePage } from '../profile/profile';
import { ProductPage } from '../product/product';
import { ScanConfirmationPage } from '../scan-confirmation/scan-confirmation';


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
    <ion-tab [root]="scanConfirmationPage" tabTitle = "Product" tabIcon="basket"></ion-tab>
    <ion-tab [root]="profilePage" tabTitle = "Profile" tabIcon ="people"></ion-tab>
  </ion-tabs>
  `,
})
export class TabsPage {

  homePage = HomePage;
  shopPage = ShopPage;
  profilePage = ProfilePage;
  scanConfirmationPage = ScanConfirmationPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
