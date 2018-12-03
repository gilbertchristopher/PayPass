import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';
import { UserService } from '../../services/buyerService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOpened = false;
  userData: any;

  constructor(public navCtrl: NavController, private userService: UserService) {

    
  }

  ionViewDidLoad(){
    this.userData = this.userService.getUserData()
    console.log(this.userData)
  }

  onSearch(event){
    console.log(event.target.value)
  }

  goToStoreDetailPage(/*store*/){
    this.navCtrl.push(StoreDetailPage)
  }
}
