import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CursosComponent } from './cursos/cursos.component';
import { EditarCursoComponent } from './editar-curso/editar-curso.component';
import { VisualizarCursoComponent } from './visualizar-curso/visualizar-curso.component';

const routes: Routes = [
  { path: '', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarCursoComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarCursoComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarCursoComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
