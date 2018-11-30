import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/authService';
import { User } from '../../data/user.interface';
import { Seller } from '../../data/seller.interface';
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
  user: User;
  sellerInfo: Seller;
  userData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersellerPage');
  }


  ngOnInit(){
    this.initializeForm();
  }


  private initializeForm(){
    this.regisForm = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      firstname: new FormControl(null, Validators.compose([Validators.required])),
      lastname: new FormControl(null),
      phoneNumber: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]))
      // emailInput: new FormControl(null, Validators.compose([Validators.required])),
      // usernameInput: new FormControl(null, Validators.compose([Validators.required])),
      // passwordInput: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      // // firstnameInput: new FormControl(null, Validators.compose([Validators.required])),
      // // lastnameInput: new FormControl(null, Validators.compose([Validators.required])),
      // // dobInput: new FormControl(null, Validators.compose([Validators.required])),
      // // addressInput: new FormControl(null, Validators.compose([Validators.required])),
      // handphoneInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  // goToSignInPage(){
  //   this.navCtrl.push(LoginPage);
  // }

  // regis(){
  //   this.navCtrl.push(LoginPage);
  // }

  goToSignInPage(){
    this.navCtrl.popToRoot();
  }

  regis(){
    this.user = this.regisForm.value;
    console.log(this.user)
    this.authService.signup(this.regisForm.value.email, this.regisForm.value.password, this.user, this.sellerInfo);
  }
}
