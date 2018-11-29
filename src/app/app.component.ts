import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../services/authService';
import firebase from 'firebase';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  // rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthService) {
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
      //kalo ada user nya mau ngapain...
    });
  }

  logout() {
    this.authService.logout();
  }
}

