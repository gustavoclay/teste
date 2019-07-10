import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Curso } from 'src/app/model/Curso';
import { Page } from 'src/app/model/Page';
import { Pageable } from 'src/app/model/Pageable';
import { Turma } from 'src/app/model/Turma';
import { TurmaService } from 'src/app/service/turma.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html'
})
export class TurmasComponent implements OnInit {

  columns = [];
  resposta: Page<Turma>;
  turmas: Turma[];
  page = new Pageable();

  @ViewChild('acoes') acoes: TemplateRef<any>;
  @ViewChild('ativo') ativo: TemplateRef<any>;

  constructor(
    private turmaService: TurmaService,
    private loader: NgxUiLoaderService,
    private toastr: ToastrService,
  ) {
    this.page.pageNumber = 0;
    this.page.pageSize = 10;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
    this.columns = [
      { prop: 'codigo', name: 'Código' },
      { prop: 'nome', name: 'Nome' },
      { prop: 'curso.nome', name: 'Curso' },
      { prop: 'ativo', cellTemplate: this.ativo, name: 'Status' },
      { prop: '', cellTemplate: this.acoes, name: 'Ações', sortable: false }
    ];
  }

  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.loader.startBackground();
    this.page.pageNumber = pageInfo.offset;
    this.turmaService.pesquisar(this.page.pageNumber, this.page.pageSize).subscribe(res => {
      this.resposta = res;
      this.turmas = this.resposta.content;
      this.page = res.pageable;
      this.loader.stopBackground();
    });
  }

  remover(turma: Curso) {
    this.loader.startBackground();
    this.turmaService.remover(turma.codigo).subscribe(
      res => {
        this.removerRegistroDaLista(turma);
        this.toastr.success
          ('Turma ' + turma.codigo + ' - ' + turma.nome + ' removida com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao remover turma: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  removerRegistroDaLista(row: any): void {
    const tmp = this.turmas;
    _.remove(tmp, (linha) => _.isEqual(linha, row));
    this.turmas = [...tmp];
  }

  isAtivo(status: boolean) {
    if (status === true) { return 'Ativo'; } else if (status === false) { return 'Desativado'; }
  }

}
