import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { AuthService } from '../../services/authService';
import { User } from '../../data/user.interface';
import { Seller } from '../../data/seller.interface';


@IonicPage()
@Component({
  selector: 'page-registerseller-openhour',
  templateUrl: 'registerseller-openhour.html',
})
export class RegistersellerOpenhourPage {
  openHourForm: FormGroup;
  user: User;
  sellerInfo: any;
  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.userData = navParams.data;
  }
  ngOnInit(){
    this.initializeForm();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistersellerOpenhourPage');
  }
  private initializeForm(){
    console.log("test");
    console.log(this.navParams.data);
    this.openHourForm = new FormGroup({
      mondayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      mondayCloseHour: new FormControl(null, Validators.compose([Validators.required])),
      tuesdayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      tuesdayCloseHour: new FormControl(null, Validators.compose([Validators.required])),
      wednesdayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      wednesdayCloseHour: new FormControl(null, Validators.compose([Validators.required])),
      thursdayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      thursdayCloseHour: new FormControl(null, Validators.compose([Validators.required])),
      fridayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      fridayCloseHour: new FormControl(null, Validators.compose([Validators.required])),
      saturdayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      saturdayCloseHour: new FormControl(null, Validators.compose([Validators.required])),
      sundayOpenHour: new FormControl(null, Validators.compose([Validators.required])),
      sundayCloseHour: new FormControl(null, Validators.compose([Validators.required]))
    })
  }

  regis(){
    
  }
}
