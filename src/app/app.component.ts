import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../services/buyerService';
import { AuthService } from '../services/authService';

import { IntroPage } from '../pages/intro/intro';




@Component({
  templateUrl: 'app.html',
  providers: [AuthService]
})
export class MyApp {
  rootPage: any;
  userData1: any;
  userData2: any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private buyerService: UserService, private loadingCtrl: LoadingController,
     private alertCtrl: AlertController, private oneSignal: OneSignal, private storage: Storage, private toastCtrl: ToastController) {
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
    this.oneSignalSetup();



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
        this.storage.get('intro-done').then((value) => {
          if (value == null) {
            console.log("Slider 2")
            this.storage.set('intro-done', false);
            this.rootPage = IntroPage;
          }
          else {
            console.log("Login Login 2")
            this.rootPage = LoginPage;
          }
        });
      }
    }, () => {
      this.storage.get('intro-done').then((value) => {
        if (value == null) {
          console.log("Slider 2")
          this.storage.set('intro-done', false);
          this.rootPage = IntroPage;
        }
        else {
          console.log("Login Login 2")
          this.rootPage = LoginPage;
        }
      });
    });
  }

  oneSignalSetup() {
    if (isCordovaAvailable()) {
      // this.oneSignal.startInit('7ae173a1-545e-4bc1-92e3-1839314e42bd', '534497429105');
      this.oneSignal.startInit('7ae173a1-545e-4bc1-92e3-1839314e42bd', 'REMOTE');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


      this.oneSignal.handleNotificationReceived().subscribe((data) => {
        this.onPushReceived(data.payload);
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
        // this.onPushReceived(data.payload);
      });

      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        // do something when a notification is opened
        this.onPushOpened(data.notification.payload);
      });

      this.oneSignal.endInit();

      this.getID();
    }

  }

  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }

  onPushReceived(payload: OSNotificationPayload) {
    alert('Push received: ' + payload.body);
  }

  getID() {
    this.oneSignal.getIds().then(data => {
      let toast = this.toastCtrl.create({
        message: data.userId + " " + data.pushToken,
        duration: 10000,
        position: 'bottom',
      })
      toast.present();
    })
  }
}

