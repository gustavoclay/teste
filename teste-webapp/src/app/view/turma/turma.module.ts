import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CoreModule } from './../../core/core.module';
import { CriarTurmaComponent } from './criar-turma/criar-turma.component';
import { EditarTurmaComponent } from './editar-turma/editar-turma.component';
import { TurmaAlunoComponent } from './turma-aluno/turma-aluno.component';
import { TurmaRoutingModule } from './turma-routing.module';
import { TurmasComponent } from './turmas/turmas.component';
import { VisualizarTurmaComponent } from './visualizar-turma/visualizar-turma.component';

@NgModule({
  declarations: [
    TurmasComponent,
    CriarTurmaComponent,
    EditarTurmaComponent,
    VisualizarTurmaComponent,
    TurmaAlunoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TurmaRoutingModule,
    NgxDatatableModule,
    CoreModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class TurmaModule { }
