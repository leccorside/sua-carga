import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  proximo(){
    this.slides.slideNext();
  }

  anterior(){
    this.slides.slidePrev();
  }

  pular(){
    this.navCtrl.setRoot(LoginPage);
  }

}
