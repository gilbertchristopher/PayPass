import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';
import { UserService } from '../../services/buyerService';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOpened = false;
  userData: any;
  seller: any[];

  constructor(public navCtrl: NavController, private userService: UserService) {
      const storeList = firebase.database().ref('user');
      storeList.on("value", snapshot => {
        let foo = snapshot.val();
         this.seller = [];
        for(let i in foo){
          if(foo[i].role == "Seller"){
            this.seller.push(foo[i]);
          }
        }
      });
  }

  ionViewDidLoad(){
    this.userData = this.userService.getUserData()
    console.log(this.userData)
  }

  onSearch(event){
    console.log(event.target.value)
  }

  goToStoreDetailPage(store: any){
    this.navCtrl.push(StoreDetailPage, store)
  }
}
