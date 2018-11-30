import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../history/history';
import { EditProfilePage } from '../edit-profile/edit-profile';


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

  history(){
    console.log("history")
    this.navCtrl.push(HistoryPage);
  }

  editProfile(){
    console.log("editProfile")
    this.navCtrl.push(EditProfilePage);
  }
}
