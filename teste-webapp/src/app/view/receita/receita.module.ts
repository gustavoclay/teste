import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CoreModule } from 'src/app/core/core.module';

import { CriarReceitaComponent } from './criar-receita/criar-receita.component';
import { EditarReceitaComponent } from './editar-receita/editar-receita.component';
import { ReceitaRoutingModule } from './receita-routing.module';
import { ReceitasComponent } from './receitas/receitas.component';
import { VisualizarReceitaComponent } from './visualizar-receita/visualizar-receita.component';

@NgModule({
  declarations: [
    ReceitasComponent,
    CriarReceitaComponent,
    EditarReceitaComponent,
    VisualizarReceitaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReceitaRoutingModule,
    NgxDatatableModule,
    TooltipModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class ReceitaModule { }
