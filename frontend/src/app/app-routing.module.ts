import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoutiqueComponent } from './boutique/boutique.component';

const routes: Routes = [
  {path : "", component: BoutiqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
