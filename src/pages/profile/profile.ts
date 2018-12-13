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
  role: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,  private buyerService: UserService) {
    
  }

  ionViewWillEnter(){
    console.log(this.buyerService.userData)
    this.buyerData = this.buyerService.getUserData();
    this.role = this.buyerData.role;
  }

  logout(){
    console.log("logout")
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  history(){
    console.log("history")
    this.navCtrl.push(HistoryPage, {"role": this.role});
  }

  editProfile(){
    console.log("editProfile")
    this.navCtrl.push(EditProfilePage, {"role": this.role});
  }
}
