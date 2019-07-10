import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProdutosComponent } from './produto/produto.component';
import { CriarProdutoComponent } from './criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';

const routes: Routes = [
  { path: '', component: ProdutosComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarProdutoComponent, canActivate: [AuthGuard] },
    { path: 'editar/:codigo', component: EditarProdutoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
