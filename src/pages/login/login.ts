import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisrolePage } from '../regisrole/regisrole';
import { AuthService } from '../../services/authService';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
      emailInput: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      passwordInput: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)]))
    })
  }

  presentFailedLoginToast(){
    let toast = this.toastCtrl.create({
      message: "Email or password is wrong!",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  presentLoginLoading() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Loading, Please Wait...',
      dismissOnPageChange: true,
    });

    loading.present();

    this.authService.signin(this.loginForm.value.emailInput, this.loginForm.value.passwordInput).then((userData) => {
      // success login
    }).catch((error) => {
      loading.dismiss();
      this.presentFailedLoginToast();
    });
  }

  login() {
    this.presentLoginLoading();
  }

  goToSignUpPage() {
    this.navCtrl.push(RegisrolePage);
  }

}
