import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';
import { CursoService } from 'src/app/service/curso.service';


@Component({
  selector: 'app-visualizar-curso',
  templateUrl: './visualizar-curso.component.html'
})
export class VisualizarCursoComponent implements OnInit {

  curso: Curso;

  constructor(
    private cursoService: CursoService,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.cursoService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.curso = res;
      this.loader.stopBackground();
    });
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
