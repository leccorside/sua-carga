import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

export interface Pontos{
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  foto: string;
  status: string;
  lat: number;
  lng: number;
}


@Injectable()
export class ApiProvider {

 private url = "https://developeranddesigner.com.br/santacarga/api/pontos/";

  constructor(
    public http2: Http) {
   
  }

  urlGet(){
    return this.url;
  }

  getAll2(){
    return this.http2.get(this.url+'api.php').pipe(map(res => res.json()));
  }

  getDetalhes(id){
    return this.getAll2().filter(ponto => ponto.id ==id)[0];
  }

  postData(body, file){
    let type = "application/json; charset=UTF-8";
    let headers = new Headers({ 'Content-Type': type });
    let options = new RequestOptions({ headers: headers});

    return this.http2.post(this.url + file, JSON.stringify(body), options)
    .map(res => res.json());
  }

}
