import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import * as $ from 'jquery';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

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
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    $(function () {
      setTimeout(function () {
        $(".fly-in-item-form").removeClass('hidden')
      }, 500);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  slideChanged(){
    let currentIndex = this.slides.getActiveIndex();
    //console.log(currentIndex);
    if(currentIndex == 1){
      $(function () {
        setTimeout(function () {
          $(".fly-in").removeClass('hidden')
        }, 500);
      });
    }
  }

  navHome() {
    this.navCtrl.setRoot(LoginPage);
  }

}
