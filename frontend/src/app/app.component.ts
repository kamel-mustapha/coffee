import { Component } from '@angular/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  reload_page = () => { 
    Swal.fire({
      title: 'Confirmation',
      text: 'Rafraîchir la page met fin à toutes les ventes en cours.',
      confirmButtonColor: "#bc0000",
      confirmButtonText: 'Oui',
      cancelButtonText : 'Non',
      showCancelButton : true ,
      
    }).then(value=>{
      if(value['isConfirmed']){
        location.reload()
      }
    }) 
  }
  
}
