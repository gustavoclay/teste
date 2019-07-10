import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarReceitaComponent } from './criar-receita/criar-receita.component';
import { EditarReceitaComponent } from './editar-receita/editar-receita.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { VisualizarReceitaComponent } from './visualizar-receita/visualizar-receita.component';

const routes: Routes = [
  { path: '', component: ReceitasComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarReceitaComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarReceitaComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarReceitaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceitaRoutingModule { }
