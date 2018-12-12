import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { OneSignal } from '@ionic-native/onesignal';

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
    private push: Push, private alertCtrl: AlertController, private oneSignal: OneSignal) {
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

    // run push notification firebase
    // this.pushSetup();

    // push notification OneSignal
    // this.oneSignalSetup();

    // check if there is a user that has been login or not
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
        this.rootPage = LoginPage;
      }
    }, () => {
      this.rootPage = LoginPage;
    });
  }

  oneSignalSetup() {
    // this.oneSignal.startInit('7ae173a1-545e-4bc1-92e3-1839314e42bd', '534497429105');
    this.oneSignal.startInit('7ae173a1-545e-4bc1-92e3-1839314e42bd', 'REMOTE');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
      let alert = this.alertCtrl.create({
        title: "New message",
        message: "You have new message",
        buttons: [
          {
            text: 'See',
            handler: () => {
              console.log('Checkout clicked');
            }
          }
        ]
      })
      alert.present();
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();
  }

  pushSetup() {
    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: "534497429105",
        // titleKey: "You have new message",
        // messageKey: "Hello there! New message",
        // icon: "../../resources/android/icon/drawable-hdpi-icon.png",
        // forceShow: true,
        // sound: true,
        // vibrate: true,
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let alert = this.alertCtrl.create({
          title: notification.title,
          message: notification.message,
          buttons: [
            {
              text: 'See',
              handler: () => {
                console.log('Checkout clicked');
              }
            }
          ]
        })
        alert.present();
        console.log('Received a notification', notification)
      }

    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration)
    });

    pushObject.on('error').subscribe(error => {
      console.error('Error with Push plugin', error)
    });
    // const FCM = require('fcm-node');
    // // Replace these with your own values.
    // const apiKey = 'replace with API key';
    // const deviceID = 'my device id';
    // const fcm = new FCM(apiKey);

    // const message = {
    //   to: deviceID,
    //   data: {
    //     title: 'Large Icon',
    //     message: 'Loaded from assets folder.',
    //     image: 'www/image/logo.png'
    //   }
    // };

    // fcm.send(message, (err, response) => {
    //   if (err) {
    //     console.log(err);
    //     console.log('Something has gone wrong!');
    //   } else {
    //     console.log('Successfully sent with response: ', response);
    //   }
    // });
  }
}

