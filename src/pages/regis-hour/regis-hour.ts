import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Time } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/buyerService';

/**
 * Generated class for the RegisHourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regis-hour',
  templateUrl: 'regis-hour.html',
})
export class RegisHourPage implements OnInit{
  page: string;
  userData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private authService: AuthService, private buyerService: UserService,  private viewCtrl: ViewController) {
    this.page = navParams.get('page');
    this.userData = this.buyerService.getUserData();
  }

  user: any;
  operationalHourForm: FormGroup;
  operationalHour: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  sunday: any;

  ngOnInit(){
    this.initializeForm();
  }


  private initializeForm(){
    this.operationalHourForm = new FormGroup({
      // mondayOpenHour: new FormControl(""),
      // mondayCloseHour: new FormControl(""),
      // tuesdayOpenHour: new FormControl(""),
      // tuesdayCloseHour: new FormControl(""),
      // wednesdayOpenHour: new FormControl(""),
      // wednesdayCloseHour: new FormControl(""),
      // thursdayOpenHour: new FormControl(""),
      // thursdayCloseHour: new FormControl(""),
      // fridayOpenHour: new FormControl(""),
      // fridayCloseHour: new FormControl(""),
      // saturdayOpenHour: new FormControl(""),
      // saturdayCloseHour: new FormControl(""),
      // sundayOpenHour: new FormControl(""),
      // sundayCloseHour: new FormControl(""),
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
    this.user = this.navParams.get('userData');   
    this.monday = { "openHour": this.operationalHourForm.value.mondayOpenHour, "closeHour": this.operationalHourForm.value.mondayCloseHour }
    this.tuesday = { "openHour": this.operationalHourForm.value.tuesdayOpenHour, "closeHour": this.operationalHourForm.value.tuesdayCloseHour }
    this.wednesday = { "openHour": this.operationalHourForm.value.wednesdayOpenHour, "closeHour": this.operationalHourForm.value.wednesdayCloseHour }
    this.thursday = { "openHour": this.operationalHourForm.value.thursdayOpenHour, "closeHour": this.operationalHourForm.value.thursdayCloseHour }
    this.friday = { "openHour": this.operationalHourForm.value.fridayOpenHour, "closeHour": this.operationalHourForm.value.fridayCloseHour }
    this.saturday = { "openHour": this.operationalHourForm.value.saturdayOpenHour, "closeHour": this.operationalHourForm.value.saturdayCloseHour }
    this.sunday = { "openHour": this.operationalHourForm.value.sundayOpenHour, "closeHour": this.operationalHourForm.value.sundayCloseHour }
    this.user.operationalHour = { "monday": this.monday, "tuesday": this.tuesday, "wednesday": this.wednesday, "thursday": this.thursday, "friday": this.friday, "saturday": this.saturday, "sunday": this.sunday}
    this.authService.signupSeller(this.user.email, this.user.password, this.user);  
  }

  showToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    })
    toast.present();
  }

  updateOperationHour(){
    this.monday = { "openHour": this.operationalHourForm.value.mondayOpenHour, "closeHour": this.operationalHourForm.value.mondayCloseHour }
    this.tuesday = { "openHour": this.operationalHourForm.value.tuesdayOpenHour, "closeHour": this.operationalHourForm.value.tuesdayCloseHour }
    this.wednesday = { "openHour": this.operationalHourForm.value.wednesdayOpenHour, "closeHour": this.operationalHourForm.value.wednesdayCloseHour }
    this.thursday = { "openHour": this.operationalHourForm.value.thursdayOpenHour, "closeHour": this.operationalHourForm.value.thursdayCloseHour }
    this.friday = { "openHour": this.operationalHourForm.value.fridayOpenHour, "closeHour": this.operationalHourForm.value.fridayCloseHour }
    this.saturday = { "openHour": this.operationalHourForm.value.saturdayOpenHour, "closeHour": this.operationalHourForm.value.saturdayCloseHour }
    this.sunday = { "openHour": this.operationalHourForm.value.sundayOpenHour, "closeHour": this.operationalHourForm.value.sundayCloseHour }
    this.operationalHour = { "monday": this.monday, "tuesday": this.tuesday, "wednesday": this.wednesday, "thursday": this.thursday, "friday": this.friday, "saturday": this.saturday, "sunday": this.sunday}
    this.buyerService.updateUserDataOperationalHour(this.operationalHour, "seller");
    this.showToast("Operational Hour Updated");
    this.viewCtrl.dismiss();

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisHourPage');
  }

}
