import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CoreModule } from 'src/app/core/core.module';

import { CriarDespensaComponent } from './criar-despensa/criar-despensa.component';
import { DespensaRoutingModule } from './despensa-routing.module';
import { DespensaComponent } from './despensa/despensa.component';
import { EditarDespensaComponent } from './editar-despensa/editar-despensa.component';
import { VisualizarDespensaComponent } from './visualizar-despensa/visualizar-despensa.component';


@NgModule({
  declarations: [
    DespensaComponent,
    CriarDespensaComponent,
    EditarDespensaComponent,
    VisualizarDespensaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DespensaRoutingModule,
    NgxDatatableModule,
    CoreModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class DespensaModule { }
