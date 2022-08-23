import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DetalhesPage } from '../detalhes/detalhes';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

  searchQuery: string = '';

  public pontos: any = [];

  public isLoading = false;

  //private icosearch = true;

  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  foto: string;
  status: string;
  lat: number;
  lng: number;

  tempo: any;
  distancia: any;

  map: any;
  google: any;
  points: any;
  usuarios: any;
  descricao: any;

  anggota: any;
  members: any = [];
  anggota_local: any;
  anggota_local2: any;
  anggota_local3: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private api: ApiProvider,
    public modalCtrl: ModalController,
    private geolocation: Geolocation,
    private storage: Storage
    ) {

      this.loadPontos();
  }

  ionViewWillEnter(){

    this.storage.get('lat_storage').then((val) => {
      this.anggota_local = val;
      //console.log(this.anggota_local);

      this.storage.get('lng_storage').then((val2) => {
        this.anggota_local2 = val2;
        //console.log(this.anggota_local2);
      });

    });

  }

  loadPontos(){

    this.storage.get('lat_storage').then((val) => {

      this.storage.get('lng_storage').then((val2) => {

        this.anggota_local = val;
        this.anggota_local2 = val2;

        if(!this.isLoading && this.searchQuery.length > 2){
          this.isLoading = true;

          let body = {
            resultado_busca: this.searchQuery,
            aksi: 'pontos_busca'
          };

          this.api.postData(body, 'api2.php').subscribe(data => {

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

                  // get distance matrix response
                  service.getDistanceMatrix(request).then((response) => {
                
                      var distancia = response.rows[0].elements[0].distance.text;
                      var tempo = response.rows[0].elements[0].duration.text;

                      this.pontos.push(ponto);

                      this.distancia = distancia;
                      this.tempo = tempo;

                      console.log('latPonto: '+latPonto);
                      console.log('lngPonto: '+lngPonto);
                      console.log('latCurrent: '+this.anggota_local);
                      console.log('lngCurrent: '+this.anggota_local2);
                      console.log('tempo: '+this.tempo);
                      console.log('lngPonto: '+this.distancia);
                      console.log('');
              
                  });        
      
            }

          });

        }

      });

    });

  }

  openDetalhes(ponto, distancia, tempo){
    let modal = this.modalCtrl.create(DetalhesPage, { ponto:ponto, distancia, tempo }
      );
    modal.present();
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  onSearch(){
    this.pontos = [];
    this.loadPontos();
  }

  clearSearch(){
    this.searchQuery = '';
    this.pontos = [];
    //this.icosearch = true;
  }


}
