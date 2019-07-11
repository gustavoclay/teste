import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcessoNegadoComponent } from './core/views/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './core/views/pagina-nao-encontrada.component';
import { HomeComponent } from './view/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'pessoas',
        loadChildren: './view/pessoa/pessoa.module#PessoaModule'
      }
    ]
  },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
