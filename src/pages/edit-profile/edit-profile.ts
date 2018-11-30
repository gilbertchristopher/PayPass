import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit {
  editProfileForm: FormGroup;
  user: User;
  userData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ngOnInit(){
    this.initializeForm();
  }

  private initializeForm(){
    this.editProfileForm = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      firstname: new FormControl(null, Validators.compose([Validators.required])),
      lastname: new FormControl(null),
      phoneNumber: new FormControl(null, Validators.compose([Validators.required])),
      dateOfBirth: new FormControl(null, Validators.compose([Validators.required])),
      addressInput: new FormControl(null, Validators.compose([Validators.required]))
     // password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      
      // dobInput: new FormControl(null, Validators.compose([Validators.required])),
      // addressInput: new FormControl(null, Validators.compose([Validators.required])),
      // handphoneInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }
  
  edit(){

  }

}
