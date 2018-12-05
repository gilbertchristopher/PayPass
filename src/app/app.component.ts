import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../services/buyerService';
import { AuthService } from '../services/authService';

@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  rootPage: any;
  userData1: any;
  userData2: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private buyerService: UserService, private loadingCtrl: LoadingController,
    private push: Push) {
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

    this.pushSetup();

    // Get a reference to the database service
    // var database = firebase.database();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let loader = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'Loading, fetch data...'
        });
        loader.present();
        this.buyerService.requestUserData().then((buyerInfo) => {
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

  pushSetup() {
    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: "534497429105",
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

