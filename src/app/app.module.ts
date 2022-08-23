import { FavoritosPage } from './../pages/favoritos/favoritos';
import { ContatoPage } from './../pages/contato/contato';
import { GuiaPage } from './../pages/guia/guia';
import { PerfilPage } from './../pages/perfil/perfil';
import { RecuperacaoenviadaPage } from './../pages/recuperacaoenviada/recuperacaoenviada';
import { EsquecisenhaPage } from './../pages/esquecisenha/esquecisenha';
import { VerificaemailPage } from './../pages/verificaemail/verificaemail';
import { CadastroPage } from './../pages/cadastro/cadastro';
import { LoginPage } from './../pages/login/login';
import { IntroPage } from './../pages/intro/intro';
import { ComponentsModaldetalhesComponent } from './../components/components-modaldetalhes/components-modaldetalhes';
import { BuscaPage } from './../pages/busca/busca';
import { DetalhesPage } from './../pages/detalhes/detalhes';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { PontosProvider } from '../providers/pontos/pontos';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';

import { BatteryStatus } from '@ionic-native/battery-status';
import { IonicStorageModule } from '@ionic/storage';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DetalhesPage,
    BuscaPage,
    ComponentsModaldetalhesComponent,
    IntroPage,
    LoginPage,
    CadastroPage,
    VerificaemailPage,
    EsquecisenhaPage,
    RecuperacaoenviadaPage,
    PerfilPage,
    GuiaPage,
    ContatoPage,
    FavoritosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DetalhesPage,
    BuscaPage,
    IntroPage,
    LoginPage,
    CadastroPage,
    VerificaemailPage,
    EsquecisenhaPage,
    RecuperacaoenviadaPage,
    PerfilPage,
    GuiaPage,
    ContatoPage,
    FavoritosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BatteryStatus,
    Camera,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    PontosProvider,
    ApiProvider,
  ]
})
export class AppModule {}

