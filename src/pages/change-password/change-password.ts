import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import firebase from "firebase";
import { FormGroup, FormControl, Validators } from '@angular/forms';
/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private viewCtrl: ViewController) {
    console.log("Halo")
    this.initializeForm();
  }

  changePasswordForm: FormGroup;
  user = firebase.auth().currentUser;


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');

  }

  initializeForm() {
    this.changePasswordForm = new FormGroup({
      currPassword: new FormControl(null, Validators.compose([Validators.required])),
      newPassword: new FormControl(null, Validators.compose([Validators.required])),
      rePassword: new FormControl(null, Validators.compose([Validators.required])),
    })
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    })
    toast.present();
  }

  submitPassword() {
    firebase.auth().currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, this.changePasswordForm.value.currPassword)).then(() => {
      if (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.rePassword) {
        this.user.updatePassword(this.changePasswordForm.value.newPassword).then(() => {
          this.showToast("Change Password Success");
          this.viewCtrl.dismiss();
        }).catch(function (error) {
          console.log("error " + error);
          // this.showToast(error)
        });
      }
      else {
        this.showToast("New password and confirm new password is not match!")
      }
    })

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
