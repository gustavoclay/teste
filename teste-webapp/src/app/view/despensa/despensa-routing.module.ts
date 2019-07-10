import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { CriarDespensaComponent } from './criar-despensa/criar-despensa.component';
import { DespensaComponent } from './despensa/despensa.component';
import { EditarDespensaComponent } from './editar-despensa/editar-despensa.component';
import { VisualizarDespensaComponent } from './visualizar-despensa/visualizar-despensa.component';

const routes: Routes = [
  { path: '', component: DespensaComponent, canActivate: [AuthGuard] },
  { path: 'novo', component: CriarDespensaComponent, canActivate: [AuthGuard] },
  { path: 'editar/:codigo', component: EditarDespensaComponent, canActivate: [AuthGuard] },
  { path: 'visualizar/:codigo', component: VisualizarDespensaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespensaRoutingModule { }
