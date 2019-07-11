import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';

import { CriarPessoaComponent } from './criar-pessoa/criar-pessoa.component';
import { EditarPessoaComponent } from './editar-pessoa/editar-pessoa.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoasComponent } from './pessoas/pessoas.component';
import { VisualizarPessoaComponent } from './visualizar-pessoa/visualizar-pessoa.component';

@NgModule({
  declarations: [
    PessoasComponent,
    CriarPessoaComponent,
    EditarPessoaComponent,
    VisualizarPessoaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PessoaRoutingModule,
    NgxDatatableModule,
    TooltipModule,
    NgxMaskModule,
    NgxViacepModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class PessoaModule { }
