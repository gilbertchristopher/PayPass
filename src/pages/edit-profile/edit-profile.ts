import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/buyerService';
import { ChooseLocationPage } from '../choose-location/choose-location';
import { Loc } from '../../services/location';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage implements OnInit {
  editProfileForm: FormGroup;
  user: User;
  userData = [];
  buyerData: any;
  marker: Loc;
  address: any;
  lat = -6.178306;
  lng = 106.631889;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,  private userService: UserService, private modalCtrl: ModalController) {
    this.buyerData = this.userService.getUserData();
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
  onOpenMap() {
    let modal = this.modalCtrl.create(ChooseLocationPage, {'lat': this.lat, 'lng': this.lng});
    modal.present();

    modal.onDidDismiss(
      (data: any) => {
        if(data.marker){
          this.marker = data.marker;
          this.lat = this.marker.lat;
          this.lng = this.marker.lng;
          this.address = data.address;
        }
      }
    );
  }
 
  edit(){
    this.buyerData = {"email": this.editProfileForm.value.email, "firstname": this.editProfileForm.value.firstname, "lastname":this.editProfileForm.value.lastname, "phoneNumber": this.editProfileForm.value.phoneNumber, "address": this.editProfileForm.value.addressInput, "dateOfBirth": this.editProfileForm.value.dateOfBirth}
    this.userService.updateUserData(this.buyerData);
    this.navCtrl.pop();
  }


}
