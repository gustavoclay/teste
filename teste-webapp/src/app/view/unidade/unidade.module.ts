import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CoreModule } from 'src/app/core/core.module';

import { CriarUnidadeComponent } from './criar-unidade/criar-unidade.component';
import { EditarUnidadeComponent } from './editar-unidade/editar-unidade.component';
import { UnidadeRoutingModule } from './unidade-routing.module';
import { UnidadesComponent } from './unidades/unidades.component';
import { VisualizarUnidadeComponent } from './visualizar-unidade/visualizar-unidade.component';

@NgModule({
  declarations: [
    UnidadesComponent,
    CriarUnidadeComponent,
    EditarUnidadeComponent,
    VisualizarUnidadeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UnidadeRoutingModule,
    NgxDatatableModule,
    TooltipModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class UnidadeModule { }
