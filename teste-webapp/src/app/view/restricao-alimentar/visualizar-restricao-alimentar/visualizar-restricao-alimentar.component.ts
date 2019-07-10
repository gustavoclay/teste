import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RestricaoAlimentarService } from 'src/app/service/restricao-alimentar.service';

import { RestricaoAlimentar } from './../../../model/RestricaoAlimentar';

@Component({
  selector: 'app-restricao-alimentar-aluno',
  templateUrl: './visualizar-restricao-alimentar.component.html'
})
export class VisualizarRestricaoAlimentarComponent implements OnInit {

  restricaoAlimentar: RestricaoAlimentar;

  constructor(
    private restricaoAlimentarService: RestricaoAlimentarService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.restricaoAlimentarService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.restricaoAlimentar = res;
      this.loader.stopBackground();
    });
  }

}
