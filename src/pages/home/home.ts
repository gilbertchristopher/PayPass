import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StoreDetailPage } from '../store-detail/store-detail';
import { UserService } from '../../services/buyerService';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
//import { Injectable } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOpened = false;
  userData: any;
  seller: any[];
  loadedSeller: any[] = [];

  constructor(public navCtrl: NavController, private userService: UserService, public storage: Storage) {
      const storeList = firebase.database().ref('seller');
      storeList.on("value", snapshot => {
        let foo = snapshot.val();
         this.seller = [];
        for(let i in foo){
          this.seller.push(foo[i]);
          this.loadedSeller.push(foo[i]);
        }
      });
  }

  ionViewDidLoad(){
    this.userData = this.userService.getUserData()
    console.log(this.userData)

    // this.storage.get('intro-done').then(done => {
    //   if(!done){
    //     this.storage.set('intro-done', true);
    //     this.navCtrl.setRoot(IntroPage);
    //   }
    // });
  }

  onSearch(search){
    this.seller = this.loadedSeller;
    var query = search.srcElement.value;
    if(!query){
      return
    }
    this.seller= this.seller.filter((value) => {
      if(value.storename && query) {
        if (value.storename.toLowerCase().indexOf(query.toLowerCase()) > -1){
          return true;
        }
      }
      if(value.address && query) {
        if (value.address.toLowerCase().indexOf(query.toLowerCase()) > -1){
          return true;
        }
      }
    });
  }

  goToStoreDetailPage(store: any){
    this.navCtrl.push(StoreDetailPage, store)
  }

  cancelSearch() {
    this.isSearchbarOpened = false;
    this.seller = this.loadedSeller;
  }
}
