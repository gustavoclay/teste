import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule } from 'ngx-mask';

import { CoreModule } from './../../core/core.module';
import { CriarFornecedorComponent } from './criar-fornecedor/criar-fornecedor.component';
import { EditarFornecedorComponent } from './editar-fornecedor/editar-fornecedor.component';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { FornecedoresComponent } from './fornecedor/fornecedor.component';
import { VisualizarFornecedorComponent } from './visualizar-fornecedor/visualizar-fornecedor.component';

@NgModule({
  declarations: [
    FornecedoresComponent,
    CriarFornecedorComponent,
    EditarFornecedorComponent,
    VisualizarFornecedorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FornecedorRoutingModule,
    NgxDatatableModule,
    NgxViacepModule,
    NgxMaskModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class FornecedorModule { }
