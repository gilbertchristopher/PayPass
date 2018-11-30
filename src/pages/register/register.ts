import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/authService';
import { User } from '../../data/user.interface';
import { Buyer } from '../../data/buyer.interface';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  regisForm: FormGroup;
  user: User;
  buyerInfo: Buyer;
  userData = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
  }

  ionViewDidLoad() {
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
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      
      // dobInput: new FormControl(null, Validators.compose([Validators.required])),
      addressInput: new FormControl(null, Validators.compose([Validators.required]))
      // handphoneInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  

  goToSignInPage(){
    this.navCtrl.popToRoot();
  }

  regis(){
    this.user = this.regisForm.value;
    console.log(this.user)
    this.authService.signup(this.regisForm.value.email, this.regisForm.value.password, this.user, this.buyerInfo);
  }
}
