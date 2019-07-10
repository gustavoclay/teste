import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarUnidadeComponent } from './criar-unidade/criar-unidade.component';
import { EditarUnidadeComponent } from './editar-unidade/editar-unidade.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { VisualizarUnidadeComponent } from './visualizar-unidade/visualizar-unidade.component';

const routes: Routes = [
  { path: '', component: UnidadesComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarUnidadeComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarUnidadeComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarUnidadeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadeRoutingModule { }
