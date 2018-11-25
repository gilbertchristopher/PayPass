import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOpened = false;

  constructor(public navCtrl: NavController) {

  }

  onSearch(event){
    console.log(event.target.value)
  }

  goToStoreDetailPage(/*store*/){
    this.navCtrl.push(StoreDetailPage)
  }
}
