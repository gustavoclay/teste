import { EditarFornecedorComponent } from './editar-fornecedor/editar-fornecedor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarFornecedorComponent } from './criar-fornecedor/criar-fornecedor.component';
import { FornecedoresComponent } from './fornecedor/fornecedor.component';
import { VisualizarFornecedorComponent } from './visualizar-fornecedor/visualizar-fornecedor.component';

const routes: Routes = [
  { path: '', component: FornecedoresComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarFornecedorComponent, canActivate: [AuthGuard] },
   { path: 'editar/:codigo', component: EditarFornecedorComponent, canActivate: [AuthGuard] },
   { path: 'visualizar/:codigo', component: VisualizarFornecedorComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
