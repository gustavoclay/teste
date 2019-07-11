import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CriarPessoaComponent } from './criar-pessoa/criar-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { PessoasComponent } from './pessoas/pessoas.component';
import { VisualizarPessoaComponent } from './visualizar-pessoa/visualizar-pessoa.component';


const routes: Routes = [
  { path: '', component: PessoasComponent },
  { path: 'novo', component: CriarPessoaComponent },
  { path: 'editar/:codigo', component: EditarPessoaComponent },
  { path: 'visualizar/:codigo', component: VisualizarPessoaComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }

