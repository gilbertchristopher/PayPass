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
    };
    if(currentIndex == 2){
      $(function () {
        setTimeout(function () {
          $(".slide-3").removeClass('hidden')
        }, 500);
      });
    };
    if(currentIndex == 3){
      $(function () {
        setTimeout(function () {
          $(".slide-4").removeClass('hidden')
        }, 500);
      });
    };
    if(currentIndex == 4){
      $(function () {
        setTimeout(function () {
          $(".slide-5").removeClass('hidden')
        }, 500);
      });
    };
    if(currentIndex == 5){
      $(function () {
        setTimeout(function () {
          $(".slide-6").removeClass('hidden')
        }, 500);
      });
    };
  }

  navHome() {
    this.navCtrl.setRoot(LoginPage);
  }

}
