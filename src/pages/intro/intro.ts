import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import * as $ from 'jquery';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    $(function(){
      setTimeout(function(){
        $(".fly-in-item-form").removeClass('hidden')
      }, 500);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  navHome() {
    this.navCtrl.setRoot(LoginPage);
  }

}
