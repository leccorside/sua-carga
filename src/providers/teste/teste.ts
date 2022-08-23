import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Pontos{
  id: string;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  foto: string;
  status: string;
  lat: string;
  lng: string;
}

@Injectable()
export class TesteProvider {

  private url = "https://developeranddesigner.com.br/santacarga/api/pontos";

  constructor(public http: HttpClient) {
    
  }

  getAll(){
    return this.http.get<[Pontos]>(this.url);
   }

   get(id: string){
    return this.http.get<[Pontos]>(this.url + '/' + id);
   }

}
