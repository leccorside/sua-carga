import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-recuperacaoenviada',
  templateUrl: 'recuperacaoenviada.html',
})
export class RecuperacaoenviadaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperacaoenviadaPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
