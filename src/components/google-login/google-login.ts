import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { RegisrolePage } from '../../pages/regisrole/regisrole';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform, NavController } from 'ionic-angular';

/**
 * Generated class for the GoogleLoginComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  text: string;
  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth,private gplus: GooglePlus,private platform: Platform) {
    // console.log('Hello GoogleLoginComponent Component');
    this.user = this.afAuth.authState;
  }

  googleLogin(){
    if (this.platform.is('cordova')){
      this.nativeGoogleLogin();
      // this.navCtrl.push(RegisrolePage);
    }else{
      this.webGoogleLogin();
      // this.navCtrl.push(RegisrolePage);
    }
    
  }

  async nativeGoogleLogin(): Promise<firebase.User>{
    try{
      const gplusUser = await this.gplus.login({
        'webClientId': '534497429105-mcmofi2n4a49hkn5juvl4b9e67j2c0pm.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      this.navCtrl.push(RegisrolePage);
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      )
    }catch(err){
      console.log(err)
    }
   
  }

  async webGoogleLogin(): Promise<void>{
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
    }catch(err){
      console.log(err)
    }
  }

  // signOut(){
  //   this.afAuth.auth.signOut();
  //   if(this.platform.is('cordova')){
  //     this.gplus.logout();
  //   }
  // }

}
