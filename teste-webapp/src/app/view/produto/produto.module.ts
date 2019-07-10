import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ProdutosComponent } from './produto/produto.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { CriarProdutoComponent } from './criar-produto/criar-produto.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    ProdutosComponent,
    CriarProdutoComponent,
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProdutoRoutingModule,
    NgxDatatableModule,
    CoreModule
  ],
  exports: [],
  providers: [],
})
export class ProdutoModule { }
