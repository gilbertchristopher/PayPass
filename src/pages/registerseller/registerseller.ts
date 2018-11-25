import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistersellerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerseller',
  templateUrl: 'registerseller.html',
})
export class RegistersellerPage {
  regisForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersellerPage');
  }


  ngOnInit(){
    this.initializeForm();
  }


  private initializeForm(){
    this.regisForm = new FormGroup({
      emailInput: new FormControl(null, Validators.compose([Validators.required])),
      usernameInput: new FormControl(null, Validators.compose([Validators.required])),
      passwordInput: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      firstnameInput: new FormControl(null, Validators.compose([Validators.required])),
      lastnameInput: new FormControl(null, Validators.compose([Validators.required])),
      dobInput: new FormControl(null, Validators.compose([Validators.required])),
      addressInput: new FormControl(null, Validators.compose([Validators.required])),
      handphoneInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  goToSignInPage(){
    this.navCtrl.push(LoginPage);
  }

  regis(){
    this.navCtrl.push(LoginPage);
  }
}
