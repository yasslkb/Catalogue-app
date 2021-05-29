import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { AbstractType, Component, OnInit } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, retry, startWith } from 'rxjs/operators'
import { Produit } from 'src/app/Model/Produit';
import { ProduitsService } from 'src/app/Services/produits.service';
import { AppDataState, DataStateEnum } from 'src/app/states/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  /*
   ca marche ou produits:Produit[] | null=null; ou produits?: Produit[]
   thse goes with the first methode in html to access data  
   onGetAllProduits() {
     this.produitservice.getAllProducts().subscribe(data => {
       this.produits = data;
     })
   }
   */
  motCle: string = '';
  produits$: Observable<AppDataState<Produit[]>> | null = null; // on met le $ pour indiquer que c'est un observable
  readonly DataStateEnum = DataStateEnum;

  constructor(private produitservice: ProduitsService) { }

  
  ngOnInit(): void {
  }

  onGetAllProduits() {
    //ce genre de traitement mous ne laisse pas possibilite de traiter les erreur.
    //this.produits$ = this.produitservice.getAllProducts();
    this.produits$ = this.produitservice.getAllProducts().pipe(
      map(data => (
        {
        
          datastate: DataStateEnum.LOADED, data: data
        }
      )),
      startWith(
        { datastate: DataStateEnum.LOADING }
      ),
      
      catchError(
        (err) => of(
          {
            datastate: DataStateEnum.ERROR, errormessage: err.message
          }
        ))


    )

  }
  onGetSelectedProduits() {
    this.produits$ = this.produitservice.getSelectedProducts().pipe(
      map(data =>
      ({
        datastate: DataStateEnum.LOADED, data: data
      })),
      startWith(
        {
          datastate: DataStateEnum.LOADING
        }
      ),
      catchError(
        (err) => of({
          datastate: DataStateEnum.ERROR, errormessage: err.message
        })
      )
    )
  }

  onGetAvailableProduits() {
    this.produits$ = this.produitservice.getAvailableProducts().pipe(
      map(data =>
      ({
        datastate: DataStateEnum.LOADED, data: data
      })),
      startWith(
        {
          datastate: DataStateEnum.LOADING
        }
      ),
      catchError(
        (err) => of({
          datastate: DataStateEnum.ERROR, errormessage: err.message
        })
      )
    )
  }

  onSearche(dataForm:any) {
    this.motCle = dataForm.motCle;
    this.produits$=this.produitservice.searche(this.motCle).pipe(
      map(data => ({
        datastate:DataStateEnum.LOADED , data:data
      }))
    ),
      startWith(
        {
          datastate:DataStateEnum.LOADING
        }
      ),
      catchError(
        err => of(
          {
            datastate: DataStateEnum.ERROR, errormessage: err.message
          }
        )
      )

    
  }
}