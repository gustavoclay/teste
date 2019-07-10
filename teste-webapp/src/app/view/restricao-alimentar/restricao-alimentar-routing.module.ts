import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarRestricaoAlimentarComponent } from './criar-restricao-alimentar/criar-restricao-alimentar.component';
import { EditarRestricaoAlimentarComponent } from './editar-restricao-alimentar/editar-restricao-alimentar.component';
import { RestricoesAlimentaresComponent } from './restricoes-alimentares/restricoes-alimentares.component';
import {
  VisualizarRestricaoAlimentarComponent,
} from './visualizar-restricao-alimentar/visualizar-restricao-alimentar.component';

const routes: Routes = [
  { path: '', component: RestricoesAlimentaresComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarRestricaoAlimentarComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarRestricaoAlimentarComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarRestricaoAlimentarComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestricaoAlimentarRoutingModule { }
