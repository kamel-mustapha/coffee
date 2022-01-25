import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from '../services/server.service';
import Swal from 'sweetalert2'
import {
  trigger,
  state,
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

  products : any = []
  tables : any = []
  totalPrix : any = {}
  totalRendu : any = 0
  selectedTable : any = 1
  articlesInTable : any = {}

  constructor( private server:ServerService ) { }

  ngOnInit(): void {
    this.server.get_products().subscribe( value => {
      this.products = value
    })
    this.server.get_tables().subscribe( value => {
      this.tables = value
    })   
    this.totalPrix[this.selectedTable] = 0
    this.articlesInTable[this.selectedTable] = []

    document.addEventListener('click', () => document.querySelector('#pop-up')?.classList.add('hidden'))
  }

  sellProduct(id : number){
    let product_to_add = this.products.find((product:any) => product.id == id)
    let selectProduct = this.articlesInTable[this.selectedTable].find((product:any) => product.id == id)
    if(!selectProduct){
      product_to_add['quantite'] = 1
      this.articlesInTable[this.selectedTable].push(product_to_add)
    } else {
      selectProduct.quantite ++
    }
    this.calculTotalPrix()
  }

  changeTable(numero : any){
    this.selectedTable = numero
    if(!this.totalPrix[this.selectedTable]){
      this.totalPrix[this.selectedTable] = 0
    }
    if(!this.articlesInTable[this.selectedTable]){
      this.articlesInTable[this.selectedTable] = []
    }
  }

  deleteFromTable(id : number){
    let articleInTable = this.articlesInTable[this.selectedTable].find((article:any) => article.id == id)
    articleInTable.quantite -= 1
    if(articleInTable.quantite <= 0){
      this.articlesInTable[this.selectedTable] = this.articlesInTable[this.selectedTable].filter((article:any) => article.id != id)
    }
    this.calculTotalPrix()
  }

  calculTotalPrix(){
    this.totalPrix[this.selectedTable] = 0
    this.articlesInTable[this.selectedTable].forEach((article:any) => {
      this.totalPrix[this.selectedTable] += (article.prix)*article.quantite
    })
  }
  confirmVente(form : NgForm){
    
    this.totalPrix[this.selectedTable] -= form.value.remise

    if(form.value.versement && form.value.versement - this.totalPrix[this.selectedTable] >= 0){
      this.totalRendu = form.value.versement - this.totalPrix[this.selectedTable] 
      document.querySelector('#pop-up')?.classList.remove('hidden')
    } 
    
   
    let data = {
      'products' : this.articlesInTable[this.selectedTable],
      'remise' : form.value.remise
    }

    this.server.sell_product(data).subscribe((response:any) => {
      if(response.includes('succes')){
        form.reset()
        this.articlesInTable[this.selectedTable] = []
        this.totalPrix[this.selectedTable] = 0
      }
    })
  }

  annulerVente(){
    Swal.fire({
      title: 'Confirmation',
      text: 'Vous voulez vraiment annuler la vente?',
      confirmButtonColor: "#bc0000",
      confirmButtonText: 'Oui',
      cancelButtonText : 'Non',
      showCancelButton : true ,
      
    }).then(value=>{
      if(value['isConfirmed']){
        this.articlesInTable[this.selectedTable] = []
        this.totalPrix[this.selectedTable] = 0
        }
      }) 
    }
    
    
}
