import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ReceitaService } from 'src/app/service/receita.service';

import { Receita } from '../../../model/Receita';

@Component({
  selector: 'app-receita',
  templateUrl: './visualizar-receita.component.html'
})
export class VisualizarReceitaComponent implements OnInit {

  receita: Receita;

  constructor(
    private receitaService: ReceitaService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.receitaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.receita = res;
      this.loader.stopBackground();
    });
  }

}
