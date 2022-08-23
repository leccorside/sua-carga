
import { BuscaPage } from './../busca/busca';
import { DetalhesPage } from './../detalhes/detalhes';
import { PontosProvider } from './../../providers/pontos/pontos';
import { ApiProvider, Pontos } from './../../providers/api/api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  descricao: string;
  telefone: string;
  email: string;
  categoria: string;
  funcionamento: string;
  site: string;
  foto: string;
  status: string;
  lat: number;
  lng: number;


  map: any;
  google: any;
  points: any;
  usuarios: any;
  pontos = [];
  pontos2: Pontos;

  display = 'block';
  display2 = 'none';

  marker: any;
  marker2: any;

  originList: any;

  anggota_local: any;
  anggota_local2: any;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public pontoPvd: PontosProvider,
    public modalCtrl: ModalController,
    public api: ApiProvider,
    private storage: Storage
    ) {


  }

  ionViewWillEnter(){
   //this.fillMissedPoints2();
   this.pontos = [];

   this.pegarPosicaoAtual();

   this.storage.get('lat_storage').then((val) => {
    this.anggota_local = val;
    //console.log('LAT STORAGE: '+this.anggota_local);
  });

  this.storage.get('lng_storage').then((val2) => {
    this.anggota_local2 = val2;
    //console.log('LNG STORAGE: '+this.anggota_local2);
  });

  }


  ionViewDidLoad(){

    const loader = this.loadingCtrl.create({
      content: "Carregando mapa...",
      duration: 4000
    });
    loader.present();

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      //console.log(resp.coords.latitude);
      //console.log(resp.coords.longitude);

      const mapOptions = {
       zoom: 11,
       center: position,
       disableDefaultUI: true
      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
         position: position,
         map: this.map,
         title: 'Minha posição',
         animation: google.maps.Animation.BOUNCE,
         icon: '../../assets/imgs/minha-posicao.png'
      });

      const locationButton = document.getElementById('botao');

      locationButton.addEventListener("click", () => {
        this.map.setZoom(14);
       // this.map.setCenter(this.marker.getPosition());

        //this.map.setPosition(position);
        this.map.setCenter(position);
      });

      
      const dispIcon = {
        url:'../../assets/imgs/marker-disponivel.png',
          size: {
          width: 39,
          height: 51
        }
      };

      const indisIcon = {
        url:'../../assets/imgs/marker-indisponivel.png',
          size: {
          width: 39,
          height: 51
        }
      };

      const ocupIcon = {
        url:'../../assets/imgs/marker-ocupado.png',
          size: {
          width: 39,
          height: 51
        }
      };

        let body = {
          aksi: 'load_Pontos',
        };

        this.api.postData(body, 'api2.php').subscribe(data => {
          for(let ponto of data.result){

            //const geocoder = new google.maps.Geocoder();
            const service = new google.maps.DistanceMatrixService();
      
            const origem = { lat: resp.coords.latitude, lng: resp.coords.longitude };
            const destino = { lat: Number(ponto.lat), lng: Number(ponto.lng) };

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
              // put response
              //(document.getElementById("response") as HTMLDivElement).innerText = JSON.stringify(response, null, 2);
  
                //var originList = response.originAddresses;
                //var destinationList = response.destinationAddresses;
  
                //console.log(response.rows[0].elements[0].distance.text);
                //console.log(response.rows[0].elements[0].duration.text);
          
                var distancia = response.rows[0].elements[0].distance.text;
                var tempo = response.rows[0].elements[0].duration.text

            const marker2 = new google.maps.Marker({
              position: {
                lat: Number(ponto.lat),
                lng: Number(ponto.lng)
              },
              nome: 'nome',
              icon: 
                (ponto.status == 'disponivel') ? dispIcon :
                (ponto.status == 'indisponivel') ? indisIcon : ocupIcon,
              map: this.map,
          });

          this.pontos.push(ponto);

            marker2.addListener("click", () => {

              //this.map.setZoom(17);
              console.log('Latitude destino: '+marker2.position.lat());
              console.log('Longitude destino: '+marker2.position.lng());

              console.log('Distância do destino: '+distancia);
              console.log('Tempo médico de carro: '+tempo);

              this.map.setCenter(marker2.getPosition());
              this.map.setZoom(17);
              //this.map.panBy(0, 100);

              let modal = this.modalCtrl.create(DetalhesPage, 
                {ponto: ponto, distancia: distancia, tempo: tempo}, 
                {cssClass: 'my-modal-class' }
                );

                modal.present();

            });

          });

          }
       
        });
        

      marker.addListener("click", () => {
        this.map.setZoom(14);
        this.map.setCenter(marker.getPosition());
        console.log('Lat origem: '+marker.position.lat());
        console.log('lng origem: '+marker.position.lng());

        //this.map.panBy(0, 100);
      });

     }).catch((error) => {
       console.log('Error getting location', error);
       alert('Erro ao tentar capturar sua localização. Por favor verifica se deu permissão ao app.');
     });

     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {

     });

  }


  buscar(){
    let modal = this.modalCtrl.create(BuscaPage);
    modal.present();  
  }


  pegarPosicaoAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {

      const latCurrent = resp.coords.latitude;
      const lngCurrent = resp.coords.longitude;

      this.storage.set('lat_storage', latCurrent);
      this.storage.set('lng_storage', lngCurrent);

      console.log(latCurrent);
      console.log(lngCurrent);

    }).catch((error) => {
      console.log('Error getting location', error);
      alert('Erro ao tentar capturar sua localização. Por favor verifica se deu permissão ao app.');
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {});
  }


}
