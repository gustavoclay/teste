import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarRegistroNutricionalComponent } from './criar-registro-nutricional/criar-registro-nutricional.component';
import { EditarRegistroNutricionalComponent } from './editar-registro-nutricional/editar-registro-nutricional.component';
import { RegistrosNutricionaisComponent } from './registros-nutricionais/registros-nutricionais.component';

const routes: Routes = [
  { path: ':aluno', component: RegistrosNutricionaisComponent, canActivate: [AuthGuard] },
  { path: ':aluno/novo', component: CriarRegistroNutricionalComponent, canActivate: [AuthGuard] },
  { path: ':aluno/editar/:codigo', component: EditarRegistroNutricionalComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroNutricionalRoutingModule { }
