import { EsquecisenhaPage } from './../esquecisenha/esquecisenha';
import { HomePage } from './../home/home';
import { CadastroPage } from './../cadastro/cadastro';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;

  anggota_local: any;
  members: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this. pegarPosicaoAtual();
  }

  cadastro(){
    this.navCtrl.setRoot(CadastroPage);
  }

  esquecisenha(){
    this.navCtrl.setRoot(EsquecisenhaPage);
  }

  login(){

    if(this.email == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha o e-mail',
        duration: 3000
      });
      toast.present();

    }

    else if(this.senha == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha a senha',
        duration: 3000
      });
      toast.present();

    }

    else{

      let body = {
        email: this.email,
        senha: this.senha,
        aksi: 'login'
      };

      this.api.postData(body, 'api2.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          this.storage.set('session_storage', data.result);

          this.navCtrl.setRoot(HomePage);

          const toast = this.toastCtrl.create({
            message: 'Seja bem-vindo!',
            duration: 3000
          });
          toast.present();

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

  pegarPosicaoAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {

      const latCurrent = resp.coords.latitude;
      const lngCurrent = resp.coords.longitude;

      this.storage.set('lat_storage', latCurrent);
      this.storage.set('lng_storage', lngCurrent);

      console.log(resp.coords);

    }).catch((error) => {
      console.log('Error getting location', error);
      alert('Erro ao tentar capturar sua localização. Por favor verifica se deu permissão ao app.');
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {});
  }


}


