import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HistoryDetailsPage } from '../history-details/history-details'


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  transactionData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  historyDetails(){
    let storeInformationModal = this.modalCtrl.create(HistoryDetailsPage, this.transactionData);
    storeInformationModal.present();
  }

}
