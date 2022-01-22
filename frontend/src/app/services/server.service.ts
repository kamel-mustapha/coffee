import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  apiUrl = 'http://localhost:8000/'
  constructor( private server:HttpClient ) { }


  get_products = () => this.server.get<[]>(this.apiUrl + 'products/')
  get_tables = () => this.server.get<[]>(this.apiUrl + 'tables/')
  sell_product = (form : {}) => this.server.post<{}>(this.apiUrl + 'vente/', form)
}
