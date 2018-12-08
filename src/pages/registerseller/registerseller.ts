import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/authService';
import { User } from '../../data/user.interface';
import { Seller } from '../../data/seller.interface';
import { Loc } from '../../services/location';
import { ChooseLocationPage } from '../choose-location/choose-location';


@IonicPage()
@Component({
  selector: 'page-registerseller',
  templateUrl: 'registerseller.html',
})
export class RegistersellerPage {
  regisForm: FormGroup;
  // user: User;
  user: any;
  sellerInfo: any;
  userData = [];
  marker: Loc;
  lat: number;
  lng: number;
  address: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private modalCtrl: ModalController) {
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
      lastname: new FormControl(null, Validators.compose([Validators.required])),
      storename: new FormControl(null, Validators.compose([Validators.required])),
      phoneNumber: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8)])),
      address: new FormControl(null, Validators.compose([Validators.required]))
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

  onOpenMap(){
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

  regis(){
    this.user = this.regisForm.value;
    console.log(this.user)
    this.authService.signupSeller(this.regisForm.value.email, this.regisForm.value.password, this.user);
  }
}
