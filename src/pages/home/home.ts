import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';
// import 'firebase/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOpened = false;

  constructor(public navCtrl: NavController) {
    // creating instance of firebase
    
  }

  onSearch(event){
    console.log(event.target.value)
  }

  goToStoreDetailPage(/*store*/){
    this.navCtrl.push(StoreDetailPage)
  }
}
