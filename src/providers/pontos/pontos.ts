import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Ponto {
  id: number;
  lat: number;
  lng: number;
}


@Injectable()
export class PontosProvider {

  

  geo: any;
  type: string;

  private url = "https://developeranddesigner.com.br/santacarga/api/pontos/";

  constructor(public http: Http) {
    console.log('Hello PontosProvider Provider');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getMissedPontos(){
    return [
      {
        id: 1, 
        nome: 'Mario dias',
        endereco: 'Endereço de teste 1',
        cidade: 'Brasília',
        estado: 'DF',
        foto: '../assets/imgs/toten1.jpg',
        status: 'disponivel',
        lat: -15.8290201,
        lng: -47.9800671, 
        type: 'disponivel'
      },
      {
        id: 2, 
        nome: 'Joana silva',
        endereco: 'Endereço de teste 2',
        cidade: 'Brasília',
        estado: 'DF',
        foto: '../assets/imgs/toten2.jpg',
        status: 'indisponivel',
        lat: -15.8311722,
        lng: -47.9787582, 
        type: 'indisponivel'
      },
      {
        id: 3, 
        nome: 'Pablo rios',
        endereco: 'Endereço de teste 3',
        cidade: 'Brasília',
        estado: 'DF',
        foto: '../assets/imgs/toten3.jpg',
        status: 'ocupado',
        lat: -15.8327125,
        lng: -47.9861698, 
        type: 'ocupado'
      },
      {
        id: 4, 
        nome: 'Johnatnan amorim',
        endereco: 'Endereço de teste 4',
        cidade: 'Brasília',
        estado: 'DF',
        foto: '../assets/imgs/toten1.jpg',
        status: 'disponivel',
        lat: -15.8340941,
        lng: -47.9881351, 
        type: 'disponivel'
      }
    ]
  }

  retornar(){
    return this.http.get(this.url+'api.php').pipe(map(res => res.json()));
  }

  getPontos(id){
    return this.getMissedPontos().filter(ponto => ponto.id ==id)[0];
  }

  getAllByDate() {
    return this.http.get(this.url+'api.php');
  }



}
