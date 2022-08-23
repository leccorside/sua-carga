import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-verificaemail',
  templateUrl: 'verificaemail.html',
})
export class VerificaemailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificaemailPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  cadastrar(){
    this.navCtrl.setRoot(VerificaemailPage);
  }

}
