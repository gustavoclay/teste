import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CriarRegistroAlimentarComponent } from './criar-registro-alimentar/criar-registro-alimentar.component';
import { EditarRegistroAlimentarComponent } from './editar-registro-alimentar/editar-registro-alimentar.component';
import { RegistroAlimentarRoutingModule } from './registro-alimentar-routing.module';
import { RegistrosNutricionaisComponent } from './registros-alimentar/registros-alimentar.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    RegistrosNutricionaisComponent,
    CriarRegistroAlimentarComponent,
    EditarRegistroAlimentarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistroAlimentarRoutingModule,
    CoreModule,
    NgxDatatableModule,
    NgxMaskModule,
    TooltipModule
  ],
  exports: [],
  providers: [],
})
export class RegistroAlimentarModule { }
