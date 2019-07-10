import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UnidadeService } from 'src/app/service/unidade.service';

import { Unidade } from '../../../model/Unidade';

@Component({
  selector: 'app-unidade',
  templateUrl: './visualizar-unidade.component.html'
})
export class VisualizarUnidadeComponent implements OnInit {

  unidade: Unidade;

  constructor(
    private unidadeService: UnidadeService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.unidadeService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.unidade = res;
      this.loader.stopBackground();
    });
  }

}
