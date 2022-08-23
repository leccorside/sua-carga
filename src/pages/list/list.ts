import { ApiProvider, Pontos } from './../../providers/api/api';
import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { DetalhesPage } from '../detalhes/detalhes';
import { Storage } from '@ionic/storage';
import { BuscaPage } from '../busca/busca';

declare var google;

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  pontos: any = [];
  distancias: any = [];
  tempos: any = [];

  distancia: any;
  tempo: any;

  anggota: any;
  members: any = [];
  anggota_local: any;
  anggota_local2: any;
  anggota_local3: any;

  public isLoading = false;
  public nada = false;

  limit: number = 4;
  start: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private api: ApiProvider,
    public modalCtrl: ModalController,
    private storage: Storage,
    
    ) {

  }

  ionViewWillEnter(){

    //this.getRetornar();
    this.loadPontos();
    this.pontos = [];
    this.distancia = [];
    this.tempo = [];
    this.start = 0;
   
  }

  /*getRetornar(){
    this.api.getAll2().subscribe(response => {
      console.log(response);
      this.pontos = response;
     });
  }*/

  
loadPontos(){

  this.isLoading = true;

  return new Promise(resolve => {

  this.storage.get('lat_storage').then((val) => {

    this.storage.get('lng_storage').then((val2) => {

      this.anggota_local = val;
      this.anggota_local2 = val2;

      let body = {
        aksi: 'load_Pontos2',
        limit: this.limit,
        start: this.start,
      };

      this.api.postData(body, 'api2.php').subscribe(data => {

        if(data.success){
          this.nada = false;
        }
        else{
          this.nada = true;
        }

        this.isLoading = false;

        const service = new google.maps.DistanceMatrixService();

        for(let ponto of data.result){

          var latPonto = ponto.lat;
          var lngPonto = ponto.lng;
              
          const origem = { lat: this.anggota_local, lng: this.anggota_local2 };
          const destino = { lat: Number(latPonto), lng: Number(lngPonto) };

          const request = {
            origins: [origem],
            destinations: [destino],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          };

          service.getDistanceMatrix(request).then((response) => {
                
            var distancia = response.rows[0].elements[0].distance.text;
            var tempo = response.rows[0].elements[0].duration.text;

            console.log('latPonto: '+latPonto);
            console.log('lngPonto: '+lngPonto);
            console.log('latCurrent: '+this.anggota_local);
            console.log('lngCurrent: '+this.anggota_local2);
            console.log('tempo: '+tempo);
            console.log('distância: '+distancia);
            console.log('');

            this.distancia = distancia;
            this.tempo = tempo;

            this.pontos.push(ponto);
        
          });   

        }

        resolve(true);

      });

    });

  });

  });

}

doInfinite(infiniteScroll) {

  this.start += this.limit;
  setTimeout(() => {
    this.loadPontos().then(()=> {
      infiniteScroll.complete();
    });
  }, 500);

}

doRefresh(refresher) {
  this.ionViewWillEnter();
  this.pontos = [];
  this.distancia = [];
  this.tempo = [];
  refresher.complete();
}


 detalhes(ponto, distancia, tempo){
    let modal = this.modalCtrl.create(DetalhesPage, { ponto:ponto, distancia: distancia, tempo: tempo }
      );
      modal.present();

      //this.navCtrl.push(DetalhesProdutoPage, {post:produto});
  }

  busca(){
    let modal = this.modalCtrl.create(BuscaPage);
    modal.present(); 
  }

}
