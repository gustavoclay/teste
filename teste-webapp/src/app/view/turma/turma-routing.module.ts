import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarTurmaComponent } from './criar-turma/criar-turma.component';
import { EditarTurmaComponent } from './editar-turma/editar-turma.component';
import { TurmaAlunoComponent } from './turma-aluno/turma-aluno.component';
import { TurmasComponent } from './turmas/turmas.component';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';

const routes: Routes = [
  { path: '', component: TurmasComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarTurmaComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarTurmaComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarTurmaComponent, canActivate: [AuthGuard] },
  { path: 'alunos/:codigo', component: TurmaAlunoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurmaRoutingModule { }
