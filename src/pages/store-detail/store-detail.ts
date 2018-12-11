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
  loadedProducts: any[];
  product: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.store = navParams.data;
    this.products = [];
    this.loadedProducts = [];
    for(let i in this.store.products){
      this.product = this.store.products[i];
      this.product.id = i;
      this.products.push(this.product);
      this.loadedProducts.push(this.product);
    }
  }

  ionViewDidLoad() {
    // nanti inisialisasi store nya  
  }

  onSearch(event){
    this.products = this.loadedProducts;
    var query = event.target.value;
    if(!query){
      return
    }
    this.products = this.products.filter((value) => {
      if(value.product.name && query) {
        if (value.product.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
          return true;
        }
      }
    });
  }

  cancelSearch(){
    this.isSearchbarOpened=false;
    this.products = this.loadedProducts;
  }

  // present the modal when call this method
  presentStoreInformationModal(){
    let storeInformationModal = this.modalCtrl.create(StoreInformationPage, this.navParams.data);
    storeInformationModal.present();
  }
}