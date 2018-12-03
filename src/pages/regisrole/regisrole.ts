import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { RegistersellerPage } from '../registerseller/registerseller';

@IonicPage()
@Component({
  selector: 'page-regisrole',
  templateUrl: 'regisrole.html',
})
export class RegisrolePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisrolePage');
  }

  goToRegisFormBuyer(){
    this.navCtrl.push(RegisterPage);
  }

  goToRegisFormSeller(){
    this.navCtrl.push(RegistersellerPage);
  }
}
