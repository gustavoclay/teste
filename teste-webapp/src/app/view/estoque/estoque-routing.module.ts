import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { EstoqueComponent } from './estoque/estoque.component';
import { LancamentoComponent } from './lancamento/lancamento.component';


const routes: Routes = [
  { path: '', component: EstoqueComponent, canActivate: [AuthGuard] },
  { path: 'lancamento', component: LancamentoComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
