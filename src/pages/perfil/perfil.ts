import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  nome: string;
  email: string;
  telefone: string;
  senhaatual: string = '';
  novasenha: string = '';
  status: string;
  foto: string;

  anggota: any;
  members: any = [];
  anggota_local: any;
  anggota_local2: any;

  dados:string;

  cameraData: string;
  base64Image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera
     ) {

      const loader = this.loadingCtrl.create({
        content: "Carregando...",
        duration: 3000
      });
      loader.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  ionViewWillEnter(){

    this.dados = "meusdados";

    this.storage.get('session_storage').then((res)=>{
        this.anggota = res;
        if(this.anggota){
         this.load();
        }
    });

    this.storage.get('lat_storage').then((val) => {
      this.anggota_local = val;
      console.log(this.anggota_local);
    });

    this.storage.get('lng_storage').then((val2) => {
      this.anggota_local2 = val2;
      console.log(this.anggota_local2);
    });

   }


  load(){
    let body = {
      id: this.anggota.id,
      aksi: 'profile'
    };

    this.api.postData(body, 'api2.php').subscribe(data=>{
        this.members = data.profiles;
    });

  }

  salvardados(){

    console.log(this.anggota.id);
    console.log(this.nome);
    console.log(this.email);
    console.log(this.telefone);

    const loader = this.loadingCtrl.create({
      content: "Salvando...",
      duration: 2000
    });
    loader.present();

    let body = {
      id: this.anggota.id,
      nome: this.nome,
      telefone: this.telefone,
      email: this.email,
      aksi: 'salvarpessoais'
    };

    this.api.postData(body, 'api2.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){
        this.navCtrl.setRoot(PerfilPage);
        const toast = this.toastCtrl.create({
          message: 'Dados salvos com sucesso!',
          duration: 4000
        });
        toast.present();
      }else{
        const toast = this.toastCtrl.create({
          message: alertpesan,
          duration: 4000
        });
        toast.present();
      }
    });

  }

  salvarsenha(){

    console.log(this.anggota.id);
    console.log(this.senhaatual);
    console.log(this.novasenha);

    if(this.senhaatual == ""){
      const toast = this.toastCtrl.create({
        message: 'Preencha a senha atual!',
        duration: 4000
      });
      toast.present();
    }
    else if(this.novasenha == ""){
      const toast = this.toastCtrl.create({
        message: 'Preencha a nova senha!',
        duration: 4000
      });
      toast.present();
    }
    else{

      const loader = this.loadingCtrl.create({
        content: "Salvando...",
        duration: 2000
      });
      loader.present();
  
      let body = {
        id: this.anggota.id,
        senhaatual: this.senhaatual,
        novasenha: this.novasenha,
        aksi: 'editar_senha'
      };
  
      this.api.postData(body, 'api2.php').subscribe((data) => {
        var alertpesan = data.msg;
        if(data.success){

          this.dados = "senha";
          this.navCtrl.setRoot(PerfilPage);
          
          const toast = this.toastCtrl.create({
            message: 'Senha alterada com sucesso!',
            duration: 4000
          });
          toast.present();
        }else{
          this.dados = "senha";
          const toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 4000
          });
          toast.present();
        }
      });

    }

  }

  salvarImagem(){

    const loader = this.loadingCtrl.create({
      content: "Salvando...",
      duration: 3000
    });
    loader.present();

    let body = {
      id: this.anggota.id,
      foto: this.cameraData,
      aksi: 'salvarimagem'
    };

    this.api.postData(body, 'api2.php').subscribe((data) => {
      var alertpesan = data.msg;
      if(data.success){
        this.navCtrl.setRoot(PerfilPage);
        const toast = this.toastCtrl.create({
          message: 'Imagem alterada com sucesso!',
          duration: 4000
        });
        toast.present();
      }else{
        const toast = this.toastCtrl.create({
          message: alertpesan,
          duration: 4000
        });
        toast.present();
      }
    });

  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione a imagem',
      buttons: [
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        },{
          text: 'Galeria',
          icon: 'image',
          handler: () => {
            this.openGaleria();
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem();
    }, (err) => {
     // Handle error
    });
  }

  openGaleria(){

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.cameraData = imageData;
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.salvarImagem();
    }, (err) => {
     // Handle error
    });

  }

}
