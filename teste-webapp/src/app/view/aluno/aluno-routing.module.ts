import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { AlunoRestricaoAlimentarComponent } from './aluno-restricao-alimentar/aluno-restricao-alimentar.component';
import { AlunosComponent } from './alunos/alunos.component';
import { CriarAlunoComponent } from './criar-aluno/criar-aluno.component';
import { EditarAlunoComponent } from './editar-aluno/editar-aluno.component';
import { VisualizarAlunoComponent } from './visualizar-aluno/visualizar-aluno.component';

const routes: Routes = [
  { path: '', component: AlunosComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarAlunoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarAlunoComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarAlunoComponent, canActivate: [AuthGuard] },
  { path: 'restricao-alimentar/:codigo', component: AlunoRestricaoAlimentarComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
