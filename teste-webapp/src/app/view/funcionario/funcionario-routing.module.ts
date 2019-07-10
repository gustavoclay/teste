import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarFuncionarioComponent } from './criar-funcionario/criar-funcionario.component';
import { EditarFuncionarioComponent } from './editar-funcionario/editar-funcionario.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { VisualizarFuncionarioComponent } from './visualizar-funcionario/visualizar-funcionario.component';

const routes: Routes = [
  { path: '', component: FuncionariosComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarFuncionarioComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarFuncionarioComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarFuncionarioComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }

