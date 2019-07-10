import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { AcessoNegadoComponent } from './core/views/acesso-negado.component';
import { PaginaNaoEncontradaComponent } from './core/views/pagina-nao-encontrada.component';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './view/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      {
        path: 'aluno',
        loadChildren: './view/aluno/aluno.module#AlunoModule'
      },
      {
        path: 'curso',
        loadChildren: './view/curso/curso.module#CursoModule'
      },
      {
        path: 'turma',
        loadChildren: './view/turma/turma.module#TurmaModule'
      },
      {
        path: 'restricao-alimentar',
        loadChildren: './view/restricao-alimentar/restricao-alimentar.module#RestricaoAlimentarModule'
      },
      {
        path: 'receita',
        loadChildren: './view/receita/receita.module#ReceitaModule'
      },
      {
        path: 'registro-nutricional',
        loadChildren: './view/registro-nutricional/registro-nutricional.module#RegistroNutricionalModule'
      },
      {
        path: 'registro-alimentar',
        loadChildren: './view/registro-alimentar/registro-alimentar.module#RegistroAlimentarModule'
      },
      {
        path: 'unidade',
        loadChildren: './view/unidade/unidade.module#UnidadeModule'
      },
      {
        path: 'fornecedor',
        loadChildren: './view/fornecedor/fornecedor.module#FornecedorModule'
      },
      {
        path: 'produto',
        loadChildren: './view/produto/produto.module#ProdutoModule'
      },
      {
        path: 'funcionario',
        loadChildren: './view/funcionario/funcionario.module#FuncionarioModule'
      },
      {
        path: 'despensa',
        loadChildren: './view/despensa/despensa.module#DespensaModule'
      },
      {
        path: 'estoque',
        loadChildren: './view/estoque/estoque.module#EstoqueModule'
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent, canActivate: [AuthGuard] },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'pagina-nao-encontrada', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
