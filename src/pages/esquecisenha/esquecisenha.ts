import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoginPage } from '../login/login';
import { RecuperacaoenviadaPage } from '../recuperacaoenviada/recuperacaoenviada';

@IonicPage()
@Component({
  selector: 'page-esquecisenha',
  templateUrl: 'esquecisenha.html',
})
export class EsquecisenhaPage {

  email: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsquecisenhaPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  recuperar(){

    if(this.email == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha o e-mail',
        duration: 3000
      });
      toast.present();

    }else{

      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
        duration: 3000
      });
      loader.present();

      let body = {
        email: this.email,
        aksi: 'recupera_senha'
      };

      this.api.postData(body, 'api2.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){
          this.navCtrl.setRoot(LoginPage);
          const toast = this.toastCtrl.create({
            message: 'Uma senha provisória foi enviada para seu e-mail.',
            duration: 5000
          });
          toast.present();
          this.navCtrl.setRoot(RecuperacaoenviadaPage);
        }else{
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 5000
          });
          toast.present();
        }
      });
    }

  }


}
