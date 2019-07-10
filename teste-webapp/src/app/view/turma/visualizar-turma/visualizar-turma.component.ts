import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Turma } from 'src/app/model/Turma';
import { TurmaService } from 'src/app/service/turma.service';


@Component({
  selector: 'app-visualizar-turma',
  templateUrl: './visualizar-turma.component.html'
})
export class VisualizarTurmaComponent implements OnInit {

  turma: Turma;

  constructor(
    private turmaService: TurmaService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.loader.startBackground();
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.turmaService.buscaPeloCodigo(codigo).subscribe(res => {
      this.turma = res;
      this.loader.stopBackground();
    });
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
