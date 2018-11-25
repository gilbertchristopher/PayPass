import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddProductPage } from '../add-product/add-product';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  // @ViewChild('username') uname;
  // @ViewChild('password') password;

  loginForm: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.initializeForm();
  }

  private initializeForm(){
    this.loginForm = new FormGroup({
      emailInput: new FormControl(null, Validators.compose([Validators.required])),
      passwordInput: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]))
    })
  }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  login(){
    // if(this.uname.value == "admin" && this.password.value == "admin"){
    //   this.navCtrl.push(TabsPage);
    // }
    this.navCtrl.push(TabsPage);
  }

  goToSignUpPage(){
    console.log("Sign Up Page")
  }

}
