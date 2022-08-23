import { FavoritosPage } from './../pages/favoritos/favoritos';
import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { PerfilPage } from './../pages/perfil/perfil';
import { IntroPage } from './../pages/intro/intro';
import { Component, ViewChild } from '@angular/core';
import { AlertController, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Storage } from '@ionic/storage';
import { GuiaPage } from '../pages/guia/guia';
import { ContatoPage } from '../pages/contato/contato';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;

  pages: Array<{title: string, component: any}>;

  stat;
  subscription : any;

  isCarregando = false;
  isCarga = true;

  carga: number;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    private batteryStatus: BatteryStatus,
    private alertCtrl: AlertController,
    private storage: Storage,
    ) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  perfil() {
    this.nav.setRoot(PerfilPage);
  }

  mapa() {
    this.nav.setRoot(HomePage);
  }

  lista() {
    this.nav.setRoot(ListPage);
  }

  guia() {
    this.nav.setRoot(GuiaPage);
  }

  notificacoes() {
    //this.nav.setRoot(NotificacoesPage);
  }

  favoritos() {
    this.nav.setRoot(FavoritosPage);
  }

  contato() {
    this.nav.setRoot(ContatoPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {

      var online = navigator.onLine;

    if(online == true){

    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Oopss',
        subTitle: 'Você não tem conexão com a internet. Conecte-se e tente novamente.',
        buttons: ['OK']
      });
      alert.present();
    }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this. statusBateria();
    });

    this.storage.get('session_storage').then((res)=>{
      if(res == null){
        this.nav.setRoot(LoginPage);
      }
      else{
        this.nav.setRoot(HomePage);
      }
    });

  }

  statusBateria(){
    this.batteryStatus.onChange().subscribe(status => {
      this.stat = status;
      this.carga = this.stat.level;

      if(this.stat.isPlugged == true){
        this.isCarregando = true;
        this.isCarga = false;
      }else{
        this.isCarregando = false;
        this.isCarga = true;
      }
    }); 

  }


  openPage(page) {
    this.nav.setRoot(page.component);
  }

  closeMenu(){
    this.menuCtrl.close();
  }

  deslogar(){
    this.storage.clear();
    this.storage.remove('id');
    this.storage.remove('nome');
    this.storage.remove('email');
    this.storage.remove('telefone');
    this.storage.remove('senha');
    this.storage.remove('status');
    this.storage.remove('foto');
    this.nav.setRoot(LoginPage);
  }

  sair(){

    let alert = this.alertCtrl.create({
      title: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Sair',
          handler: data => {
            this.deslogar();
          }
        }
      ]
    });
    alert.present();
  }
}
