import { Component, OnInit, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, LoadingController, ToastController, Toast } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'firebase';
import { AuthService } from '../../services/authService';
import { UserService } from '../../services/buyerService';
import { ChooseLocationPage } from '../choose-location/choose-location';
import { Loc } from '../../services/location';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ChangePasswordPage } from '../change-password/change-password';

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
  role: string;
  lat = -6.178306;
  lng = 106.631889;
  base64Url: string;

  @Input('useURI') useURI: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private userService: UserService,
    private modalCtrl: ModalController, private toastCtrl: ToastController, private camera: Camera, private actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
    this.buyerData = this.userService.getUserData();
    this.role = this.buyerData.role;
    this.marker = new Loc();
    this.lat = this.buyerData.lat;
    this.lng = this.buyerData.lng;
    this.marker.setLocation(this.lat, this.lng);
  }

  ionViewWillEnter() {
    // this.base64Url = this.buyerData.profile;
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
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
    let modal = this.modalCtrl.create(ChooseLocationPage, { 'lat': this.lat, 'lng': this.lng });
    modal.present();

    modal.onDidDismiss(
      (data: any) => {

        if (data.marker) {
          console.log(data.marker);
          this.marker = data.marker;
          this.lat = this.marker.lat;
          this.lng = this.marker.lng;
          this.address = data.address;
          this.buyerData.address = this.address;
        }
      }
    );
  }

  edit() {
    this.buyerData = { "email": this.editProfileForm.value.email, "firstname": this.editProfileForm.value.firstname, "lastname": this.editProfileForm.value.lastname, "phoneNumber": this.editProfileForm.value.phoneNumber, "address": this.editProfileForm.value.addressInput, "dateOfBirth": this.editProfileForm.value.dateOfBirth, "lng": this.lng, "lat": this.lat }
    this.userService.updateUserData(this.buyerData, this.role.toLowerCase());
    this.navCtrl.pop();
  }

  editProfile() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose image',
      buttons: [
        {
          text: 'Take a Photo',
          handler: () => {
            this.getPicture(1);
          }
        },
        {
          text: 'Select From Gallery',
          handler: () => {
            this.getPicture(0);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      enableBackdropDismiss: false
    });

    actionSheet.present();
  }

  getPicture(sourceType) {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions)
      .then((base64Url) => {
        let loader = this.loadingCtrl.create({
          spinner: 'circles',
          content: 'Updating your profile'
        });
        loader.present();
        //  this.base64Url = 'data:image/jpeg;base64,' + base64Url;
        this.userService.uploadPhotoUser(base64Url, this.buyerData.role.toLowerCase()).then(() => {
          this.buyerData = this.userService.getUserData();
          loader.dismiss();
        });
      }, (err) => {
        console.log(err);
      });


  }
  changePassword() {
    console.log("ABC")
    let modal = this.modalCtrl.create(ChangePasswordPage);
    modal.present();
    console.log("DEF")
    modal.onDidDismiss(
      (data: any) => {
        console.log(data);
      }
    );
  }
  // uploadPhoto() {
  //   let storageRef = firebase.storage().ref();
  //   // Create a timestamp as filename
  //   const filename = Math.floor(Date.now() / 1000);

  //   // Create a reference to 'images/todays-date.jpg'
  //   const imageRef = storageRef.child(`images/${filename}.jpg`);

  //   imageRef.putString(this.base64Url, firebase.storage.StringFormat.DATA_URL)
  //     .then((snapshot)=> {
  //       // Do something here when the data is succesfully uploaded!
  //       this.showSuccesfulUploadAlert();
  //   });
  // }

  // showSuccesfulUploadAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Uploaded!',
  //     subTitle: 'Picture is uploaded to Firebase',
  //     buttons: ['OK']
  //   });
  //   alert.present();
  //   // clear the previous photo data in the variable
  //   this.base64Url = "";
  // }
}
