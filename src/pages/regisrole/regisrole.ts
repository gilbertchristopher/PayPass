import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { RegistersellerPage } from '../registerseller/registerseller';

/**
 * Generated class for the RegisrolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
