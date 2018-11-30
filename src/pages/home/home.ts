import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';
import { BuyerService } from '../../services/buyerService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOpened = false;
  buyerData: any;

  constructor(public navCtrl: NavController, private buyerService: BuyerService) {

    
  }

  ionViewDidLoad(){
    this.buyerData = this.buyerService.getBuyerData()
    console.log(this.buyerData)
  }

  onSearch(event){
    console.log(event.target.value)
  }

  goToStoreDetailPage(/*store*/){
    this.navCtrl.push(StoreDetailPage)
  }
}
