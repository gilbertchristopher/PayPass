import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { BuyerService } from '../services/buyerService';
import { AuthService } from '../services/authService';

@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  rootPage: any;
  userData1: any;
  userData2: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private buyerService: BuyerService, private loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    //initial firebase
    var config = {
      apiKey: "AIzaSyBZOKoPlfS4OnuJtCrdqYOwurf7zcUnNGs",
      authDomain: "paypass-id.firebaseapp.com",
      databaseURL: "https://paypass-id.firebaseio.com",
      projectId: "paypass-id",
      storageBucket: "paypass-id.appspot.com",
      messagingSenderId: "534497429105"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    // var database = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let loader = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'Loading, fetch data...'
        });
        loader.present();
        this.buyerService.requestBuyerData().then((buyerInfo) => {
          this.userData1 = buyerInfo;
          console.log(this.userData1);
          loader.dismiss();
          this.rootPage = TabsPage;
        });

      }
      else {
        console.log("logout")
        this.rootPage = LoginPage;
      }
    }, () => {
      this.rootPage = LoginPage;
    });
  }
}

