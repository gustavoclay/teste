import { Despensa } from '../../../model/Despensa';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DespensaService } from '../../../service/despensa.service';


@Component({
  selector: 'app-visualizar-despensa',
  templateUrl: './visualizar-despensa.component.html'
})
export class VisualizarDespensaComponent implements OnInit {

  despensa: Despensa;

  constructor(
    private despensaService: DespensaService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.despensaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.despensa = res;
      this.loader.stopBackground();
    });
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
