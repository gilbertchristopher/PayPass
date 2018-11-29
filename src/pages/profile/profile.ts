import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
  }

  logout(){
    console.log("logout")
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
