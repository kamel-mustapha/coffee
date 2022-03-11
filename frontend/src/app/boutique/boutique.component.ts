import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class BoutiqueComponent implements OnInit {
  products: any = [];
  tables: any = [];
  totalPrix: any = {};
  totalRendu: any = 0;
  selectedTable: any = 1;
  popUp: boolean = false;
  articlesInTable: any = {};
  tableColor: any = {};
  constructor(private server: ServerService) {}

  ngOnInit(): void {
    this.server.get_products().subscribe((value) => {
      this.products = value;
    });
    this.server.get_tables().subscribe((value) => {
      this.tables = value;
      for(let i= 1; i <= value.length; i++){
        this.totalPrix[i] = 0;
        this.articlesInTable[i] = [];
      }
      this.totalPrix['P1'] = 0;
      this.totalPrix['P2'] = 0;
      this.totalPrix['P3'] = 0;
      this.articlesInTable['P1'] = [];
      this.articlesInTable['P2'] = [];
      this.articlesInTable['P3'] = [];
    });
    document.addEventListener('click', () => {
      this.popUp = false;
    });
  }

  sellProduct(id: number){
    let product_to_add = this.products.find((product: any) => product.id == id);
    let product_to_add_sliced = {...product_to_add}
    let product_in_table = false;
    this.articlesInTable[this.selectedTable].forEach((article:any)=>{
      if(article.id == product_to_add_sliced.id){
        product_in_table = true;
        article.quantite++;
      }
    })
    if(!product_in_table){
      product_to_add_sliced.quantite = 1;
      this.articlesInTable[this.selectedTable].push(product_to_add_sliced);
    }
    this.tableColor[this.selectedTable] = true;
    this.calculTotalPrix(); 
  }

  deleteFromTable(id: number) {
    this.articlesInTable[this.selectedTable].find((article: any, index:number) => {
      if(article.id == id){
        article.quantite--;
        if(article.quantite <=0){
          this.articlesInTable[this.selectedTable].splice(index, 1)
        }
      }
    });
  
    if(this.articlesInTable[this.selectedTable].length <= 0){
      this.tableColor[this.selectedTable] = false;
    }
    this.calculTotalPrix();
  }

  changeTable(numero: any) {
    this.selectedTable = numero;
  }

  calculTotalPrix() {
    this.totalPrix[this.selectedTable] = 0;
    this.articlesInTable[this.selectedTable].forEach((article: any) => {
      this.totalPrix[this.selectedTable] += article.prix * article.quantite;
    });
  }

  confirmVente(form: NgForm) {
    this.totalPrix[this.selectedTable] -= form.value.remise;
    if (
      form.value.versement &&
      form.value.versement - this.totalPrix[this.selectedTable] >= 0
    ) {
      this.totalRendu = form.value.versement - this.totalPrix[this.selectedTable];
      this.popUp = true;
    }

    let data = {
      products: this.articlesInTable[this.selectedTable],
      remise: form.value.remise,
    };

    this.server.sell_product(data).subscribe((response: any) => {
      if (response.includes('succes')) {
        form.reset();
        this.articlesInTable[this.selectedTable] = [];
        this.totalPrix[this.selectedTable] = 0;
      }
    });
    this.tableColor[this.selectedTable] = false;
  }

  annulerVente() {
    Swal.fire({
      title: 'Confirmation',
      text: 'Vous voulez vraiment annuler la vente?',
      confirmButtonColor: '#bc0000',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
    }).then((value) => {
      if (value['isConfirmed']) {
        this.articlesInTable[this.selectedTable] = [];
        this.totalPrix[this.selectedTable] = 0;
        this.tableColor[this.selectedTable] = false;
      }
    });
  }
}
