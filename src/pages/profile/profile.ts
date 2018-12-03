import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/authService';
import { LoginPage } from '../login/login';
import { HistoryPage } from '../history/history';
import { UserService } from '../../services/buyerService';
import { EditProfilePage } from '../edit-profile/edit-profile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  
})
export class ProfilePage {
  buyerData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,  private buyerService: UserService) {
    this.buyerData = this.buyerService.getUserData();
  }

  ionViewWillEnter(){
    console.log(this.buyerService.userData)
    
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
