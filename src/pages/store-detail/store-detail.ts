import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StoreInformationPage } from '../store-information/store-information';

@IonicPage()
@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.html',
})
export class StoreDetailPage {
  isSearchbarOpened = false;
  store: any;
  products: any[];
  product: any;
  // store: Store
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.store = navParams.data;
    this.products = [];
    for(let i in this.store.products){
      this.product = this.store.products[i];
      this.product.id = i;
      this.products.push(this.product);
    }
  }

  ionViewDidLoad() {
    // nanti inisialisasi store nya  
  }

  onSearch(event){
    console.log(event.target.value)
  }

  // present the modal when call this method
  presentStoreInformationModal(){
    let storeInformationModal = this.modalCtrl.create(StoreInformationPage, this.navParams.data);
    storeInformationModal.present();
  }
}