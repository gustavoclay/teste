import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarRegistroAlimentarComponent } from './criar-registro-alimentar/criar-registro-alimentar.component';
import { EditarRegistroAlimentarComponent } from './editar-registro-alimentar/editar-registro-alimentar.component';
import { RegistrosNutricionaisComponent } from './registros-alimentar/registros-alimentar.component';

const routes: Routes = [
  { path: ':aluno', component: RegistrosNutricionaisComponent, canActivate: [AuthGuard] },
  { path: ':aluno/novo', component: CriarRegistroAlimentarComponent, canActivate: [AuthGuard] },
  { path: ':aluno/editar/:codigo', component: EditarRegistroAlimentarComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroAlimentarRoutingModule { }
