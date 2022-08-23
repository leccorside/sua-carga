import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  nome: string = '';
  email: string = '';
  telefone: string = '';
  mensagem: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoPage');
  }

  enviar(){

    if(this.nome == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha o nome',
        duration: 3000
      });
      toast.present();

    }

    else if(this.email == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha o e-mail',
        duration: 3000
      });
      toast.present();

    }

    else if(this.telefone == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha o telefone',
        duration: 3000
      });
      toast.present();

    }

    else if(this.mensagem == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha a mensagem',
        duration: 3000
      });
      toast.present();

    }

    else{

      const loader = this.loadingCtrl.create({
        content: "Enviando...",
        duration: 3000
      });
      loader.present();

      let body = {
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        mensagem: this.mensagem,
        aksi: 'contato'
      };

      this.api.postData(body, 'api2.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){
          this.navCtrl.setRoot(HomePage);

          const toast = this.toastCtrl.create({
            message: 'Mensagem enviada com sucesso! Em breve retornaremos.',
            duration: 5000
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

}
