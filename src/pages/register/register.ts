import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/authService';
import { User } from '../../data/user.interface';
import { Buyer } from '../../data/buyer.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  regisForm: FormGroup;
  user: User;
  buyerInfo: Buyer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RegisterPage');
  }

  ngOnInit(){
    this.initializeForm();
  }


  private initializeForm(){
    this.regisForm = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required])),
      // usernameInput: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      // firstnameInput: new FormControl(null, Validators.compose([Validators.required])),
      // lastnameInput: new FormControl(null, Validators.compose([Validators.required])),
      // dobInput: new FormControl(null, Validators.compose([Validators.required])),
      // addressInput: new FormControl(null, Validators.compose([Validators.required])),
      // handphoneInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  goToSignInPage(){
    this.navCtrl.push(LoginPage);
  }

  regis(){
    this.user = this.regisForm.value;
    console.log(this.regisForm.value.email);
    console.log(this.user);
    
    // this.navCtrl.push(LoginPage);
    // console.log(this.regisForm.value);
    this.authService.signup(this.regisForm.value.email, this.regisForm.value.password, this.user, this.buyerInfo);
  }
}
