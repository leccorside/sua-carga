import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'components-modaldetalhes',
  templateUrl: 'components-modaldetalhes.html'
})
export class ComponentsModaldetalhesComponent {

  public ponto:any = [];

  constructor(
    private modalController: ModalController,  
    private navCtrl: NavController,
    public viewCtrl: ViewController,
    private api: ApiProvider,
    public navParams: NavParams,
    ) {

      this.ponto = navParams.get('ponto');
    
  }

  ionViewDidLoad() {
    
  }

  fecharmodal(){
    this.viewCtrl.dismiss();
  }

}
