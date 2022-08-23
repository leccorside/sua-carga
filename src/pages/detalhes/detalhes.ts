import { LoginPage } from './../login/login';
import { PontosProvider } from './../../providers/pontos/pontos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { PerfilPage } from '../perfil/perfil';

declare var google;

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  //ponto;
  public ponto:any = [];
  public distancia:any;
  public tempo:any;

  lat: number;
  lng: number;

  map: any;
  google: any;

  anggota_local: any;
  anggota_local2: any;
  anggota_local3: any;

  favoritos: any = [];
  pontos: any = [];

  anggota: any;
  members: any = [];

  display3='block';
  display4='none';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: ApiProvider,
    private storage: Storage,
    public toastCtrl: ToastController,
    ) {
    
     // this.ponto = pontoProvider.getPontos(navParams.get('id'));
      this.ponto = navParams.get('ponto');
      this.distancia = navParams.get('distancia');
      this.tempo = navParams.get('tempo');     

     // this.initMap();
   
  }

  ionViewWillEnter(){

    this.loadFavoritos();
    this.pontos = [];

    console.log(this.ponto.id);
    

    this.storage.get('lat_storage').then((val) => {

      this.storage.get('lng_storage').then((val2) => {
  
        this.anggota_local = val;
        this.anggota_local2 = val2;

        const service = new google.maps.DistanceMatrixService();

        var latPonto = this.ponto.lat;
        var lngPonto = this.ponto.lng;
            
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

        });   

    });

  });




    const position = new google.maps.LatLng(Number(this.ponto.lat), Number(this.ponto.lng));

    const mapOptions = {
      zoom: 12,
      center: position,
      disableDefaultUI: true
     }

     this.map = new google.maps.Map(document.getElementById('map22'), mapOptions);

     const marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Minha posição',
        animation: google.maps.Animation.BOUNCE,
        icon: '../../assets/imgs/marker-disponivel.png'
     });

     marker.addListener("click", () => {
      this.map.setZoom(14);
      this.map.setCenter(marker.getPosition());
    });

  }

  abrirMapa(){
    window.open('https://maps.google.com/maps?q='+this.ponto.lat+'%2C'+this.ponto.lng+'&z=17&hl=pt-BR', '_blank');
    //window.open('https://maps.google.com/maps?q=-15.8290201%2C-47.9800671&z=17&hl=pt-BR', '_blank');
  }


  fecharModal(){
      this.viewCtrl.dismiss();
  }

  addFavoritos(){

    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;

      console.log(this.anggota.id);  
    

        if(this.anggota){

          this.display3='none';
          this.display4='block';

          //console.log(this.post.preco_produto);

          let body = {
            id_favorito: this.ponto.id,
            id_usuario: this.anggota.id,
            aksi: 'add_favoritos'
          };

          this.api.postData(body, 'api2.php').subscribe((data) => {
            var alertpesan = data.msg;

            if(data.success){
              //this.navCtrl.setRoot(LoginPage);
              const toast = this.toastCtrl.create({
                message: 'Adicionado aos favoritos',
                duration: 3000
              });
              toast.present();
            }else{
              const toast = this.toastCtrl.create({
                message: alertpesan,
                duration: 3000
              });
              toast.present();
            }
          });

        }else{
          const toast = this.toastCtrl.create({
            message: 'Faça login para adicionar aos favoritos!',
            duration: 3000
          });
          toast.present();

          this.navCtrl.setRoot(LoginPage, {});

        }

      });


  }

  deleteFavoritos(){

    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;

        this.display3='block';
        this.display4='none';

        let body = {
          id_favorito: this.ponto.id,
          id_usuario: this.anggota.id,
          aksi: 'delete_favorito'
        };

        this.api.postData(body, 'api2.php').subscribe(data=>{
            this.members = data.profiles;
        });

        const toast = this.toastCtrl.create({
          message: 'Ponto deletado dos favoritos',
          duration: 3000
        });
        toast.present();

    });

  }

  loadFavoritos(){

    this.storage.get('session_storage').then((res)=>{
      this.anggota = res;

      let body = {
        id: this.ponto.id,
        id_usuario: this.anggota.id,
        aksi: 'pontos_favoritos_usuario'
      };

      this.api.postData(body, 'api2.php').subscribe(data => {
        this.pontos = data.result;

        if(this.pontos.length == 0){
          this.display3 = 'block';
          this.display4 = 'none';
        }else{
          this.display3 = 'none';
          this.display4 = 'block';
        }

      });

    });

  }

}

