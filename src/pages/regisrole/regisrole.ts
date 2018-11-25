import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

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
  regisForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisrolePage');
  }

  ngOnInit(){
    this.initializeForm();
  }


  private initializeForm(){
    this.regisForm = new FormGroup({
      usernameInput: new FormControl(null, Validators.compose([Validators.required])),
      emailInput: new FormControl(null, Validators.compose([Validators.required])),
      handphoneInput: new FormControl(null, Validators.compose([Validators.required])),
      passwordInput: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]))
      // repasswordInput: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)))
    })
  }

  goToRegisForm(){
    this.navCtrl.push(RegisterPage);
  }
}
