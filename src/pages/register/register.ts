import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/authService';
import { User } from '../../data/user.interface';
import { Buyer } from '../../data/buyer.interface';
import { Loc } from '../../services/location';
import { ChooseLocationPage } from '../choose-location/choose-location';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  regisForm: FormGroup;
  // user: User;
  user: any;
  buyerInfo: Buyer;
  userData = [];
  marker: Loc;
  lat: number;
  lng: number;
  address: string;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private modalCtrl: ModalController) {
    this.marker = new Loc();
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
      address: new FormControl(null, Validators.compose([Validators.required]))
      // handphoneInput: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  onOpenMap() {
    let modal = this.modalCtrl.create(ChooseLocationPage, {'lat': this.lat, 'lng': this.lng});
    modal.present();

    modal.onDidDismiss(
      (data: any) => {
        
        if(data.marker){
          console.log(data.marker);
          this.marker = data.marker;
          this.lat = this.marker.lat;
          this.lng = this.marker.lng;
          this.address = data.address;
          this.regisForm.value.address = data.address;
        }
      }
    );
  }
  

  goToSignInPage(){
    this.navCtrl.popToRoot();
  }

  regis(){
    this.user = this.regisForm.value;
    this.user.lng = this.lng;
    this.user.lat = this.lat;
    console.log(this.user)
    this.authService.signupBuyer(this.regisForm.value.email, this.regisForm.value.password, this.user);
  }
}
