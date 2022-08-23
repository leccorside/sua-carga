
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  nome: string = '';
  email: string = '';
  telefone: string = '';
  senha: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  cadastrar(){

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

    else if(this.senha == ""){

      const toast = this.toastCtrl.create({
        message: 'Preencha a senha',
        duration: 3000
      });
      toast.present();

    }

    else{

      const loader = this.loadingCtrl.create({
        content: "Cadastrando...",
        duration: 3000
      });
      loader.present();

      let body = {
        nome: this.nome,
        email: this.email,
        telefone: this.telefone,
        senha: this.senha,
        aksi: 'cadastrar'
      };

      this.api.postData(body, 'api2.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){
          this.navCtrl.setRoot(LoginPage);

          const toast = this.toastCtrl.create({
            message: 'Cadastro efetuado com sucesso! Faça login.',
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
