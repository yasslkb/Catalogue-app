import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produit } from '../Model/Produit';
import { AppDataState } from '../states/product.state';


@Injectable({
  providedIn: 'root'
})
export class ProduitsService {


  constructor(private http: HttpClient) {
    
  }
  host = environment.host;

  getAllProducts():Observable<Produit[]>{
    
    return this.http.get<Produit[]>(this.host + "/produits", { observe: 'body', responseType: 'json' });
  }
  getSelectedProducts(): Observable<Produit[]>{

    return this.http.get<Produit[]>(this.host + "/produits?selected=true", { observe: 'body', responseType: 'json' });
  }
  getAvailableProducts():Observable<Produit[]>{
    
    return this.http.get<Produit[]>(this.host + "/produits?available=true", { observe: 'body', responseType: 'json' });
  }

  searche(motCle: string) {
    return this.http.get<Produit[]>(this.host + "/produits?name_like="+motCle, { observe: 'body', responseType: 'json' });
  }

  

}
