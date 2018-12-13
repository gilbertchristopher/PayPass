import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HistoryDetailsPage } from '../history-details/history-details'
import { UserService } from '../../services/buyerService';
import firebase from 'firebase';
import { AuthService } from '../../services/authService';
//import { ProductStore } from '../../data/productstore.interface';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  transactionData: any;
  userData: any;
  productsData: any[];
  items: any[];
  transactions: any[];

  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams, private buyerService: UserService, private modalCtrl: ModalController) {
    this.userData = this.buyerService.getUserData();
    //console.log(this.userData.role);
    // this.items = [];
    // let foo = this.userData.transactions;
    // for(let i in foo){
    //     foo[i].id = i;
    //     this.items.push({"id": i, "firstname": foo[i].buyerInfo.firstname, "lastname": foo[i].buyerInfo.lastname, "date": foo[i].date, "time": foo[i].time, "status": foo[i].status});
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  ionViewWillEnter() {
    this.buyerService.getAllTransactionData().then((data) => {
      this.transactions = [];
      for(let i in data){
        data[i].id = i;
        this.transactions.push(data[i]);
      }
    })
  }

  historyDetails(transactions: any) {
    let storeInformationModal = this.modalCtrl.create(HistoryDetailsPage, transactions);
    storeInformationModal.present();
  }

}
