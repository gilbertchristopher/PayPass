import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-history-details',
  templateUrl: 'history-details.html',
})
export class HistoryDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
